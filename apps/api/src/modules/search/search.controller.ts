import {
  Controller,
  Get,
  Post,
  Delete,
  Query,
  Body,
  Param,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SearchService, SearchDocument, SearchOptions, SearchResult } from './search.service';

const ALLOWED_INDICES = ['products', 'companies', 'users', 'documents', 'rfqs', 'orders'] as const;
type AllowedIndex = typeof ALLOWED_INDICES[number];

function isAllowedIndex(index: string): index is AllowedIndex {
  return ALLOWED_INDICES.includes(index as AllowedIndex);
}

@ApiTags('Search')
@ApiBearerAuth()
@Controller('search')
@UseGuards(JwtAuthGuard)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post('query')
  async search(
    @Body() body: { index: string; query: string; filters?: Record<string, unknown>; limit?: number; offset?: number },
  ): Promise<SearchResult> {
    if (!body.index || typeof body.index !== 'string') {
      throw new BadRequestException('Index name is required');
    }

    if (!isAllowedIndex(body.index)) {
      throw new BadRequestException(`Invalid index. Allowed indices: ${ALLOWED_INDICES.join(', ')}`);
    }

    if (!body.query || typeof body.query !== 'string') {
      throw new BadRequestException('Query is required');
    }

    const options: SearchOptions = {
      query: body.query,
      filters: body.filters,
      limit: Math.min(body.limit || 20, 100),
      offset: body.offset || 0,
    };

    return this.searchService.search(body.index, options);
  }

  @Post('index/:index')
  async indexDocument(
    @Param('index') index: string,
    @Body() document: SearchDocument,
  ): Promise<{ taskUid: number }> {
    if (!isAllowedIndex(index)) {
      throw new BadRequestException(`Invalid index. Allowed indices: ${ALLOWED_INDICES.join(', ')}`);
    }

    return this.searchService.indexDocuments(index, [document]);
  }

  @Post('index/:index/batch')
  async batchIndex(
    @Param('index') index: string,
    @Body() documents: SearchDocument[],
  ): Promise<{ taskUid: number }> {
    if (!isAllowedIndex(index)) {
      throw new BadRequestException(`Invalid index. Allowed indices: ${ALLOWED_INDICES.join(', ')}`);
    }

    if (!Array.isArray(documents) || documents.length === 0) {
      throw new BadRequestException('Documents array is required and cannot be empty');
    }

    if (documents.length > 1000) {
      throw new BadRequestException('Maximum 1000 documents per batch');
    }

    return this.searchService.indexDocuments(index, documents);
  }

  @Delete('index/:index/:documentId')
  async deleteDocument(
    @Param('index') index: string,
    @Param('documentId') documentId: string,
  ): Promise<{ taskUid: number }> {
    if (!isAllowedIndex(index)) {
      throw new BadRequestException(`Invalid index. Allowed indices: ${ALLOWED_INDICES.join(', ')}`);
    }

    if (!documentId || typeof documentId !== 'string') {
      throw new BadRequestException('Document ID is required');
    }

    return this.searchService.deleteDocument(index, documentId);
  }

  @Get('stats/:index')
  async getIndexStats(@Param('index') index: string) {
    if (!isAllowedIndex(index)) {
      throw new BadRequestException(`Invalid index. Allowed indices: ${ALLOWED_INDICES.join(', ')}`);
    }

    return this.searchService.getIndexStats(index);
  }

  @Get('health')
  async healthCheck(): Promise<{ status: string; connected: boolean }> {
    return {
      status: this.searchService.isHealthy() ? 'healthy' : 'degraded',
      connected: this.searchService.isHealthy(),
    };
  }

  @Post('multi')
  async multiSearch(
    @Body()
    body: {
      queries: Array<{ index: string; query: string; filters?: Record<string, unknown>; limit?: number }>;
    },
  ): Promise<SearchResult[]> {
    if (!Array.isArray(body.queries) || body.queries.length === 0) {
      throw new BadRequestException('Queries array is required');
    }

    if (body.queries.length > 10) {
      throw new BadRequestException('Maximum 10 queries per multi-search');
    }

    const results: SearchResult[] = [];

    for (const q of body.queries) {
      if (!isAllowedIndex(q.index)) {
        throw new BadRequestException(`Invalid index in query: ${q.index}`);
      }

      if (!q.query || typeof q.query !== 'string') {
        throw new BadRequestException('Each query must have a valid query string');
      }

      const options: SearchOptions = {
        query: q.query,
        filters: q.filters,
        limit: Math.min(q.limit || 10, 50),
      };
      results.push(await this.searchService.search(q.index, options));
    }

    return results;
  }
}

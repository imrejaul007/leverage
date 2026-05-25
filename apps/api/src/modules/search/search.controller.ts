import {
  Controller,
  Get,
  Post,
  Delete,
  Query,
  Body,
  Param,
} from '@nestjs/common';
import { SearchService, SearchDocument, SearchOptions, SearchResult } from './search.service';

/**
 * Search Controller
 * REST API endpoints for search functionality
 */

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  /**
   * Search documents
   */
  @Post('query')
  async search(
    @Body() body: { index: string; query: string; filters?: Record<string, unknown>; limit?: number; offset?: number },
  ): Promise<SearchResult> {
    const options: SearchOptions = {
      query: body.query,
      filters: body.filters,
      limit: body.limit || 20,
      offset: body.offset || 0,
    };

    return this.searchService.search(body.index, options);
  }

  /**
   * Index a document
   */
  @Post('index/:index')
  async indexDocument(
    @Param('index') index: string,
    @Body() document: SearchDocument,
  ): Promise<{ taskUid: number }> {
    return this.searchService.indexDocuments(index, [document]);
  }

  /**
   * Batch index documents
   */
  @Post('index/:index/batch')
  async batchIndex(
    @Param('index') index: string,
    @Body() documents: SearchDocument[],
  ): Promise<{ taskUid: number }> {
    return this.searchService.indexDocuments(index, documents);
  }

  /**
   * Delete a document
   */
  @Delete('index/:index/:documentId')
  async deleteDocument(
    @Param('index') index: string,
    @Param('documentId') documentId: string,
  ): Promise<{ taskUid: number }> {
    return this.searchService.deleteDocument(index, documentId);
  }

  /**
   * Get index stats
   */
  @Get('stats/:index')
  async getIndexStats(@Param('index') index: string) {
    return this.searchService.getIndexStats(index);
  }

  /**
   * Health check
   */
  @Get('health')
  async healthCheck(): Promise<{ status: string; connected: boolean }> {
    return {
      status: this.searchService.isHealthy() ? 'healthy' : 'degraded',
      connected: this.searchService.isHealthy(),
    };
  }

  /**
   * Search across all indices
   */
  @Post('multi')
  async multiSearch(
    @Body()
    body: {
      queries: Array<{ index: string; query: string; filters?: Record<string, unknown>; limit?: number }>;
    },
  ): Promise<SearchResult[]> {
    const results: SearchResult[] = [];

    for (const q of body.queries) {
      const options: SearchOptions = {
        query: q.query,
        filters: q.filters,
        limit: q.limit || 10,
      };
      results.push(await this.searchService.search(q.index, options));
    }

    return results;
  }
}

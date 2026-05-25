import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

/**
 * Search Service
 * Meilisearch integration for semantic and keyword search
 */

export interface SearchDocument {
  id: string;
  type: string;
  title?: string;
  content: string;
  metadata?: Record<string, unknown>;
  companyId?: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SearchOptions {
  query: string;
  filters?: Record<string, unknown>;
  limit?: number;
  offset?: number;
  sort?: string[];
  attributesToRetrieve?: string[];
  attributesToHighlight?: string[];
}

export interface SearchResult<T = SearchDocument> {
  hits: T[];
  query: string;
  processingTimeMs: number;
  limit: number;
  offset: number;
  estimatedTotalHits: number;
}

export interface IndexStats {
  numberOfDocuments: number;
  isIndexing: boolean;
  fieldDistribution: Record<string, number>;
}

@Injectable()
export class SearchService implements OnModuleInit {
  private readonly logger = new Logger(SearchService.name);
  private meilisearchUrl: string;
  private apiKey: string;
  private isConnected = false;

  // Index names
  readonly INDICES = {
    DOCUMENTS: 'documents',
    SHIPMENTS: 'shipments',
    COMPANIES: 'companies',
    COMPLIANCE: 'compliance',
  } as const;

  constructor(private configService: ConfigService) {
    this.meilisearchUrl = this.configService.get<string>('MEILI_HOST', 'http://localhost:7700');
    this.apiKey = this.configService.get<string>('MEILI_API_KEY', '');
  }

  async onModuleInit(): Promise<void> {
    await this.connect();
    await this.setupIndices();
  }

  private async connect(): Promise<void> {
    try {
      const response = await axios.get(`${this.meilisearchUrl}/health`, {
        headers: this.getHeaders(),
      });

      if (response.data.status === 'available') {
        this.isConnected = true;
        this.logger.log('Connected to Meilisearch');
      }
    } catch (error) {
      this.logger.warn(`Meilisearch not available: ${(error as Error).message}. Search will use fallback.`);
      this.isConnected = false;
    }
  }

  private getHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      ...(this.apiKey ? { Authorization: `Bearer ${this.apiKey}` } : {}),
    };
  }

  private async setupIndices(): Promise<void> {
    if (!this.isConnected) return;

    const indices = [
      {
        uid: this.INDICES.DOCUMENTS,
        primaryKey: 'id',
        settings: {
          searchableAttributes: ['title', 'content', 'type'],
          filterableAttributes: ['type', 'companyId', 'userId', 'createdAt'],
          sortableAttributes: ['createdAt', 'updatedAt'],
        },
      },
      {
        uid: this.INDICES.SHIPMENTS,
        primaryKey: 'id',
        settings: {
          searchableAttributes: ['shipmentNumber', 'origin', 'destination', 'status'],
          filterableAttributes: ['status', 'companyId', 'userId', 'transportMode'],
          sortableAttributes: ['createdAt', 'deliveryDate'],
        },
      },
      {
        uid: this.INDICES.COMPANIES,
        primaryKey: 'id',
        settings: {
          searchableAttributes: ['name', 'registrationNumber', 'country'],
          filterableAttributes: ['country', 'industry', 'kycStatus'],
          sortableAttributes: ['createdAt'],
        },
      },
      {
        uid: this.INDICES.COMPLIANCE,
        primaryKey: 'id',
        settings: {
          searchableAttributes: ['regulation', 'description', 'country'],
          filterableAttributes: ['country', 'type', 'severity'],
          sortableAttributes: ['effectiveDate'],
        },
      },
    ];

    for (const index of indices) {
      try {
        await axios.post(`${this.meilisearchUrl}/indexes`, index, { headers: this.getHeaders() });
        this.logger.log(`Created index: ${index.uid}`);
      } catch (error) {
        if ((error as any).response?.status === 409) {
          // Index already exists, update settings
          try {
            await axios.patch(`${this.meilisearchUrl}/indexes/${index.uid}/settings`, index.settings, {
              headers: this.getHeaders(),
            });
          } catch (updateError) {
            this.logger.error(`Failed to update index ${index.uid}: ${(updateError as Error).message}`);
          }
        } else {
          this.logger.error(`Failed to create index ${index.uid}: ${(error as Error).message}`);
        }
      }
    }
  }

  /**
   * Add documents to an index
   */
  async indexDocuments<T extends SearchDocument>(index: string, documents: T[]): Promise<{ taskUid: number }> {
    if (!this.isConnected) {
      this.logger.warn('Meilisearch not connected, skipping indexing');
      return { taskUid: -1 };
    }

    try {
      const response = await axios.post(
        `${this.meilisearchUrl}/indexes/${index}/documents`,
        documents,
        { headers: this.getHeaders() }
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to index documents: ${(error as Error).message}`);
      throw error;
    }
  }

  /**
   * Search documents
   */
  async search<T extends SearchDocument = SearchDocument>(
    index: string,
    options: SearchOptions
  ): Promise<SearchResult<T>> {
    if (!this.isConnected) {
      // Return empty results if not connected
      return {
        hits: [],
        query: options.query,
        processingTimeMs: 0,
        limit: options.limit || 20,
        offset: options.offset || 0,
        estimatedTotalHits: 0,
      };
    }

    try {
      const searchParams: Record<string, unknown> = {
        q: options.query,
        limit: options.limit || 20,
        offset: options.offset || 0,
      };

      // Build filter string
      if (options.filters) {
        const filterParts = Object.entries(options.filters).map(([key, value]) => {
          if (typeof value === 'string') {
            return `${key} = "${value}"`;
          }
          return `${key} = ${value}`;
        });
        if (filterParts.length > 0) {
          searchParams.filter = filterParts.join(' AND ');
        }
      }

      if (options.sort) {
        searchParams.sort = options.sort;
      }

      if (options.attributesToRetrieve) {
        searchParams.attributesToRetrieve = options.attributesToRetrieve;
      }

      if (options.attributesToHighlight) {
        searchParams.attributesToHighlight = options.attributesToHighlight;
      }

      const response = await axios.post(
        `${this.meilisearchUrl}/indexes/${index}/search`,
        searchParams,
        { headers: this.getHeaders() }
      );

      return response.data;
    } catch (error) {
      this.logger.error(`Search failed: ${(error as Error).message}`);
      throw error;
    }
  }

  /**
   * Get index statistics
   */
  async getIndexStats(index: string): Promise<IndexStats> {
    if (!this.isConnected) {
      return {
        numberOfDocuments: 0,
        isIndexing: false,
        fieldDistribution: {},
      };
    }

    try {
      const response = await axios.get(`${this.meilisearchUrl}/indexes/${index}/stats`, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to get index stats: ${(error as Error).message}`);
      throw error;
    }
  }

  /**
   * Delete a document from index
   */
  async deleteDocument(index: string, documentId: string): Promise<{ taskUid: number }> {
    if (!this.isConnected) {
      return { taskUid: -1 };
    }

    try {
      const response = await axios.delete(
        `${this.meilisearchUrl}/indexes/${index}/documents/${documentId}`,
        { headers: this.getHeaders() }
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to delete document: ${(error as Error).message}`);
      throw error;
    }
  }

  /**
   * Delete multiple documents from index
   */
  async deleteDocuments(index: string, documentIds: string[]): Promise<{ taskUid: number }> {
    if (!this.isConnected) {
      return { taskUid: -1 };
    }

    try {
      const response = await axios.post(
        `${this.meilisearchUrl}/indexes/${index}/documents/delete-batch`,
        documentIds,
        { headers: this.getHeaders() }
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to delete documents: ${(error as Error).message}`);
      throw error;
    }
  }

  /**
   * Clear all documents from an index
   */
  async clearIndex(index: string): Promise<{ taskUid: number }> {
    if (!this.isConnected) {
      return { taskUid: -1 };
    }

    try {
      const response = await axios.delete(`${this.meilisearchUrl}/indexes/${index}/documents`, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to clear index: ${(error as Error).message}`);
      throw error;
    }
  }

  /**
   * Check if service is healthy
   */
  isHealthy(): boolean {
    return this.isConnected;
  }
}

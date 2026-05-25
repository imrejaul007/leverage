import { Module, Global } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

/**
 * Search Module
 * Provides semantic and keyword search capabilities using Meilisearch
 */
@Global()
@Module({
  controllers: [SearchController],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}

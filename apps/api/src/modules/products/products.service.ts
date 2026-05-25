import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { SearchService } from '../search/search.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    private searchService: SearchService,
  ) {}

  async create(companyId: string, dto: any) {
    const product = await this.productRepo.save({
      ...dto,
      companyId,
      slug: this.generateSlug(dto.name),
    });
    await this.searchService.indexDocuments('products', [product]);
    return product;
  }

  async findAll(filters: any) {
    const { categoryId, minPrice, maxPrice, search, page = 1, limit = 20 } = filters;
    const where: any = { isPublished: true };

    if (categoryId) where.categoryId = categoryId;
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = minPrice;
      if (maxPrice) where.price.lte = maxPrice;
    }

    const [products, total] = await this.productRepo.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return { products, total, page, limit };
  }

  async findOne(id: string) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['variants', 'category'],
    });
    if (!product) throw new NotFoundException('Product not found');

    await this.productRepo.increment({ id }, 'viewCount', 1);
    return product;
  }

  async update(id: string, dto: any) {
    const product = await this.productRepo.update(id, dto);
    if (!product) throw new NotFoundException('Product not found');
    return this.findOne(id);
  }

  async delete(id: string) {
    await this.productRepo.softDelete(id);
    await this.searchService.deleteDocument('products', id);
    return { success: true };
  }

  async createVariant(productId: string, dto: any) {
    return this.productRepo.manager.save('ProductVariant', {
      ...dto,
      productId,
    });
  }

  async search(query: string, filters: any) {
    return this.searchService.search(query, { index: 'products', ...filters });
  }

  private generateSlug(name: string): string {
    return `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${uuidv4().slice(0, 8)}`;
  }
}

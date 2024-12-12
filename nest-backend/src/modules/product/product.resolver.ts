import { Resolver, Query, Args } from '@nestjs/graphql';
import { ProductService } from './product.service.js';
import { Product } from './product.schema.js';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product])
  async getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Query(() => Product, { nullable: true })
  async getProductBySku(@Args('sku') sku: string): Promise<Product | null> {
    return this.productService.getProductBySku(sku);
  }
}
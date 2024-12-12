import { Injectable } from '@nestjs/common';
import { ProductModel } from './product.schema.js';
import { Product } from './product.schema.js';

@Injectable()
export class ProductService {
  // Map Mongoose product documents to the GraphQL Product type
  private mapToProductType(product: any): Product {
    return {
      id: product._id.toString(),
      sku: product.sku,
      name: product.name,
      remainingGoods: product.remainingGoods,
    };
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const products = await ProductModel.find()
        .select('sku name remainingGoods')
        .lean();

      return products.map(this.mapToProductType);
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error(
        'Failed to retrieve all products. Please try again later.',
      );
    }
  }

  async getProductBySku(sku: string): Promise<Product | null> {
    try {
      const product = await ProductModel.findOne({ sku })
        .select('sku name remainingGoods')
        .lean();

      if (!product) return null;

      return this.mapToProductType(product);
    } catch (error) {
      console.error(`Error fetching product with SKU "${sku}":`, error);
      throw new Error(
        `Failed to retrieve product with SKU "${sku}". Please try again later.`,
      );
    }
  }
}
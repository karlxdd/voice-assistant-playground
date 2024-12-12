import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../modules/product/product.schema';

@Injectable()
export class DatabaseService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async getAllProducts() {
    try {
      const products = await this.productModel
        .find()
        .select('sku name remainingGoods')
        .exec();

      return products;
    } catch (error) {
      throw new Error(`Error fetching products: ${error.message}`);
    }
  }

  async getProductBySku(sku: string) {
    try {
      const product = await this.productModel
        .findOne({ sku })
        .select('sku name remainingGoods')
        .exec();

      if (!product) throw new Error(`Product with SKU ${sku} not found.`);

      return product;
    } catch (error) {
      throw new Error(`Error fetching product by sku: ${error.message}`);
    }
  }
}

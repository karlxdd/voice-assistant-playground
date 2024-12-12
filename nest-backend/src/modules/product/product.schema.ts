import mongoose, { Schema } from 'mongoose';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

export const productSchema = new Schema(
  {
    rack: { type: mongoose.Schema.Types.ObjectId, ref: 'WarehouseRack' },
    sku: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    remainingGoods: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Archived', 'Deleted'],
      default: 'Active',
    },
  },
  {
    timestamps: true,
  },
);

// Pre-hook to exclude archived or deleted products
productSchema.pre('find', function () {
  this.where({ status: { $nin: ['Archived', 'Deleted'] } });
});

productSchema.pre('findOne', function () {
  this.where({ status: { $nin: ['Archived', 'Deleted'] } });
});

export const ProductModel = mongoose.model('Product', productSchema);

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field()
  sku: string;

  @Field()
  name: string;

  @Field(() => Int)
  remainingGoods: number;
}

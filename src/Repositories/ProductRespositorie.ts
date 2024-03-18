import { Product } from "../models/Product"

export interface ProductRepository {
  findBySkuAndUserId(sku: string, userId: string): Promise<Product | null>
  create(productData: Partial<Product>): Promise<Product>
  findAll(): Promise<Product[]>
  findByUserId(userId: string): Promise<Product[]>
  deleteById(productId: string): Promise<Product | null>
  updateById(productId: string, productData: Partial<Product>): Promise<Product | null>
}

export class MongoDBProductRepository implements ProductRepository {
  async findBySkuAndUserId(sku: string, userId: string): Promise<any> {
    return await Product.findOne({ sku: sku, user: userId }).exec()
  }

  async create(productData: Partial<Product>): Promise<any> {
    return await new Product(productData).save()
  }

  async findAll(): Promise<any> {
    return await Product.find().exec()
  }

  async findByUserId(userId: string): Promise<any> {
    return await Product.find({ user: userId }).exec()
  }

  async deleteById(productId: string): Promise<any> {
    return await Product.findByIdAndDelete(productId).exec()
  }

  async updateById(productId: string, productData: Partial<Product>): Promise<any> {
    return await Product.findByIdAndUpdate(productId, productData, { new: true }).exec()
  }
}

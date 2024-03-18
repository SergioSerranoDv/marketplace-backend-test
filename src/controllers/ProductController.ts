import { ProductRepository, MongoDBProductRepository } from "../Repositories/ProductRespositorie"
import mongoose from "mongoose"
export class ProductController {
  private productRepository: ProductRepository

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository
  }
  public createProduct = async (productInfo: any, userId: string, email: string) => {
    try {
      //verify if the product already exists
      const productExists = await this.productRepository.findBySkuAndUserId(productInfo.sku, userId)
      if (productExists) {
        return {
          code: 409,
          status: "error",
          message: "El producto ya existe",
        }
      }
      const product = await this.productRepository.create({
        user: userId,
        email: email,
        sku: productInfo.sku,
        name: productInfo.name,
        amount: productInfo.amount,
        price: productInfo.price,
      })
      return {
        code: 201,
        status: "success",
        message: "Producto creado exitosamente",
        data: {
          product: product,
        },
      }
    } catch (error: any) {
      return {
        code: 500,
        status: "error",
        message: error.message,
      }
    }
  }
  public async getAllProducts() {
    try {
      const products = await this.productRepository.findAll()
      return {
        code: 200,
        status: "success",
        data: products,
      }
    } catch (error: any) {
      return {
        code: 500,
        status: "error",
        message: error.message,
      }
    }
  }
  public async getUserProductsById(userId: string) {
    try {
      const products = await this.productRepository.findByUserId(userId)
      return {
        code: 200,
        message: "Productos encontrados exitosamente",
        status: "success",
        data: products,
      }
    } catch (error: any) {
      return {
        code: 500,
        status: "error",
        message: error.message,
      }
    }
  }
  public async deleteProduct(productId: string) {
    try {
      const product = await this.productRepository.deleteById(productId)
      if (product) {
        return {
          code: 200,
          status: "success",
          message: "Producto eliminado exitosamente",
          data: product,
        }
      } else {
        return {
          code: 404,
          status: "error",
          message: "Product not found",
        }
      }
    } catch (error: any) {
      return {
        code: 500,
        status: "error",
        message: error.message,
      }
    }
  }
  public async updateProduct(productId: string, productInfo: any) {
    try {
      const product = await this.productRepository.updateById(productId, productInfo)
      if (product) {
        return {
          code: 200,
          status: "success",
          message: "Producto actualizado exitosamente",
          data: product,
        }
      } else {
        return {
          code: 404,
          status: "error",
          message: "Product not found",
        }
      }
    } catch (error: any) {
      return {
        code: 500,
        status: "error",
        message: error.message,
      }
    }
  }
}

import { Request, Response, Router } from "express"
import { ProductController } from "../controllers/ProductController"
import { MongoDBProductRepository } from "../Repositories/ProductRespositorie"
import { Authentication } from "../middleware/Authentication"

export class ProductRouter {
  private static instance: ProductRouter
  private productController: ProductController
  private router: Router

  private constructor(productController: ProductController) {
    this.router = Router()
    this.productController = productController
    this.router.get("/all", this.getAllProducts)
    this.router.use(Authentication.veirifyToken)
    this.router.post("/new", this.createNewProduct)
    this.router.get("/user", this.getUserProducts)
    this.router.delete("/delete/:id", this.deleteProduct)
    this.router.put("/update/:id", this.updateProductById)
  }

  static getRouter(): Router {
    if (!ProductRouter.instance) {
      const productRepository = new MongoDBProductRepository()
      const productController = new ProductController(productRepository)
      ProductRouter.instance = new ProductRouter(productController)
    }
    return ProductRouter.instance.router
  }

  private createNewProduct = async (req: Request, res: Response) => {
    try {
      if (!req.payload) {
        return res.status(401).json({ message: "Unauthorized" })
      }
      const userInfo = req.body
      const userId = req.payload.userId
      const email = req.payload.email
      const response = await this.productController.createProduct(userInfo, userId, email)
      if (response.status === "success") {
        return res.status(response.code).json({
          status: response.status,
          message: response.message,
          data: response.data,
        })
      } else {
        return res.status(response.code).json({
          status: response.status,
          message: response.message,
        })
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" })
    }
  }
  private getAllProducts = async (req: Request, res: Response) => {
    try {
      const response = await this.productController.getAllProducts()
      if (response.code === 200) {
        return res.status(200).json(response.data)
      } else {
        return res.status(500).json({ message: response.message })
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" })
    }
  }
  private getUserProducts = async (req: Request, res: Response) => {
    try {
      if (!req.payload) {
        return res.status(401).json({ message: "Unauthorized" })
      }
      const userId = req.payload.userId
      const response = await this.productController.getUserProductsById(userId)
      if (response.status === "success") {
        return res.status(200).json({
          status: response.status,
          message: response.message,
          data: response.data,
        })
      } else {
        return res.status(500).json({
          status: response.status,
          message: response.message,
        })
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" })
    }
  }
  private deleteProduct = async (req: Request, res: Response) => {
    try {
      if (!req.payload) {
        return res.status(401).json({ message: "Unauthorized" })
      }
      const productId = req.params.id

      const response = await this.productController.deleteProduct(productId)
      if (response.status === "success") {
        return res.status(response.code).json({
          status: response.status,
          message: response.message,
          data: response.data,
        })
      } else {
        return res.status(response.code).json({
          status: response.status,
          message: response.message,
        })
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" })
    }
  }
  private updateProductById = async (req: Request, res: Response) => {
    try {
      if (!req.payload) {
        return res.status(401).json({ message: "Unauthorized" })
      }
      const productId = req.params.id
      const productInfo = req.body
      const response = await this.productController.updateProduct(productId, productInfo)
      if (response.status === "success") {
        return res.status(response.code).json({
          status: response.status,
          message: response.message,
          data: response.data,
        })
      } else {
        return res.status(response.code).json({
          status: response.status,
          message: response.message,
        })
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" })
    }
  }
}

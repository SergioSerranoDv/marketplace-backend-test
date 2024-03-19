import { Request, Response, Router } from "express"
import { UserRouter } from "./UserRouter"
import { AuthRouter } from "./AuthRouter"
import { ProductRouter } from "./ProductRouter"

export class RootRouter {
  private static instance: RootRouter
  private router: Router
  private constructor() {
    this.router = Router()
    this.router.get("/", (req: Request, res: Response) => {
      res.json({
        author: "Sergio Serrano",
        appName: "marketplace-backend-test-magicLog",
        version: "1.0.0",
      })
    })

    this.router.use("/v1/user/", UserRouter.getRouter())
    this.router.use("/v1/auth/", AuthRouter.getRouter())

    this.router.use("/v1/products/", ProductRouter.getRouter())
  }
  static getRouter(): Router {
    if (!RootRouter.instance) {
      RootRouter.instance = new RootRouter()
    }
    return RootRouter.instance.router
  }
}

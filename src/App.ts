import express, { Express } from "express"
import { RootRouter } from "./routers/RootRouter"
import cors from "cors"
export class App {
  private static instance: Express
  static getInstance(): Express {
    if (!App.instance) {
      App.instance = express()
      App.instance.use(express.json())
      App.instance.use(express.urlencoded({ extended: true }))
      App.instance.use(cors())
      App.instance.use("/", RootRouter.getRouter())
    }
    return App.instance
  }
}

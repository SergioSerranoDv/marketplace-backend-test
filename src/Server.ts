import { App } from "./App"
import env from "dotenv"
import mongoose from "mongoose"
env.config()

export class Server {
  private static instance: Server
  static getInstance(): Server {
    if (!Server.instance) {
      mongoose.connect(process.env.MONGO_URI as string, {}).then(() => {
        Server.instance = App.getInstance().listen(process.env.PORT, () => {
          console.log(`Server is running on port ${process.env.PORT}`)
        })
        console.log("Connected to MongoDB")
      })
    }
    return Server.instance
  }
}

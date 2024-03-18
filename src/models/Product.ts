import { Schema } from "mongoose"
import mongoose from "mongoose"

export interface Product extends Document {
  user: any
  email: string
  sku: string
  image?: string
  name: string
  amount: number
  price: number
}

const ProductSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)
export const Product = mongoose.model("Products", ProductSchema)

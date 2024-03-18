import { Schema } from "mongoose"
import mongoose from "mongoose"

export interface User extends Document {
  email: string
  password: string
  roles: string[]
}

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      required: true,
      default: ["seller"],
    },
  },
  {
    timestamps: true,
  }
)
export const User = mongoose.model<User>("User", UserSchema)

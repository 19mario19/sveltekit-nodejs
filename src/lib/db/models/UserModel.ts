import { Schema, model } from "mongoose"
import { UserRole } from "$lib/types"

const userSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: Object.values(UserRole) },
    isActive: { type: Boolean, required: true, default: true },
    userAuthToken: { type: String, required: true },
  },
  { timestamps: true },
)

const UserModel = model("User", userSchema)

export { UserModel }

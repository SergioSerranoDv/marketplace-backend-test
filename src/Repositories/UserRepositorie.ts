import { User } from "../models/User"

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>
  create(UserData: Partial<User>): Promise<User>
}

export class MongoDBUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({ email }).exec()
  }

  async create(UserData: Partial<User>): Promise<User> {
    return await new User(UserData).save()
  }
}

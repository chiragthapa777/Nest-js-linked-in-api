import { User } from "src/auth/models/user.interface"

export interface FeedPost{
    author: Express.User
    id?:number
    body?:string
    createdAt?:Date
    user?:User
}
import { User } from "../user/user";

export interface Review {
  id: string,
  author_details: User,
  content: string,
  created_at: Date,

  title?: string,
  rating: number
}
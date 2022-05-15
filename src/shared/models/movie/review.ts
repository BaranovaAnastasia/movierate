import { User } from "../user/user";

export interface Review {
  movie_id: string;
  rating: number;
  title: string;
  review: string;
  created_at: Date;

  author: User;
}
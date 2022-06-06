import { ActionType } from "src/shared/dto";
import { Review } from "..";
import { MoviesList } from "../movies-list/movies-list";
import { User } from "./user";

export type UserAction = {
  type: ActionType;

  createdAt: Date;

  author: User;

  movieId: string;
  title: string;

  rating?: number;

  review?: Review;

  list?: MoviesList;
}
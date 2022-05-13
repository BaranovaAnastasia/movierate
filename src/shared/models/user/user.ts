import { MoviesList } from "../movies-list/movies-list";

export interface User {
  id: number,
  name: string,
  email?: string,
  avatar_path: string,
  followingIds?: string[],
  lists?: MoviesList[],

  isCurrentUser?: boolean,
}
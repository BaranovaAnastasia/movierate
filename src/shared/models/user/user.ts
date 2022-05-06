import { MoviesList } from "../movies-list/movies-list";

export interface User {
  id: number,
  email: string,
  name: string,
  
  avatar_path: string,
  followingIds?: string[],
  lists?: MoviesList[],
}
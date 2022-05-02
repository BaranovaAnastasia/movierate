import { MoviesList } from "../movies-list/movies-list";
import { UserStatistics } from "./user-statistics";

export interface User {
  id: number,
  email: string,
  name: string,
  
  avatar_path: string,
  statistics?: UserStatistics,
  followingIds?: string[],
  lists?: MoviesList[],
}
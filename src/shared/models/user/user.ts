import { MoviesList } from "../movies-list/movies-list";
import { UserStatistics } from "./user-statistics";

export interface User {
  username: string,
  name: string,
  avatar_path: string,
  
  statistics?: UserStatistics,
  followingIds?: string[],
  lists?: MoviesList[],
}
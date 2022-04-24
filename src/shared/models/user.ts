import { MoviesList } from "./movies-list";
import { UserStatistics } from "./user-statistics";

export interface User {
  id: string,
  name: string,
  picture: string,
  statistics: UserStatistics,
  following?: User[],
  lists?: MoviesList[],
}
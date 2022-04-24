import { Movie } from "./movie";
import { User } from "./user";
import { Visibility } from "./visibility";

export interface MoviesList {
  id: string,
  title: string,
  visibility?: Visibility,
  movies: Movie[],
  owner?: User
}
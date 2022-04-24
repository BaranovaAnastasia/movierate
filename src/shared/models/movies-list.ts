import { Movie } from "./movie";
import { Visibility } from "./visibility";

export interface MoviesList {
  id: string,
  title: string,
  visibility?: Visibility,
  movies: Movie[]
}
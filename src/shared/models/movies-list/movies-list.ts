import { Movie } from "../movie/movie";
import { Visibility } from "./visibility";

export interface MoviesList {
  id: string,
  title: string,
  visibility?: Visibility,
  movies: Movie[],
  ownerId?: string
}
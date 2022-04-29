import { Movie } from "../movie/movie";

export interface TMDBMoviesList {
  id: string,
  results: Movie[]
}
import { Credits } from "./credits"
import { Trailer } from "./trailer"

export interface Movie {
  id: string,
  title?: string,
  year?: number,
  poster_path?: string,
  runtime?: number,
  overview?: string,
  genres?: string[],
  tagline?: string,
  production_countries?: {
    name: string
  },

  trailer?: Trailer,
  credits?: Credits,

  vote_average?: number,
  vote_count?: number,
  watched?: number,
}

export const DEFAULT_MOVIE: Movie = {
  id: ""
}
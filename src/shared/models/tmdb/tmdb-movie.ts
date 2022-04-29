import { Credits } from "../movie/credits"
import { Trailer } from "../movie/trailer"

export interface TMBDMovie {
  id: string,
  title: string,
  release_date: Date,
  poster_path: string,
  runtime: number,
  overview: string,
  genres: {
    name: string
  }[],
  tagline: string,
  production_countries: {
    name: string
  },

  trailer?: Trailer,
  credits?: Credits,
}
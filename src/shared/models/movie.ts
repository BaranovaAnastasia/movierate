import { MovieStatistics } from "./movie-statistics";

export interface Movie {
  id: string,
  title: string,
  year: number,
  posterUrl: string,

  runtimeMins?: number,
  runtimeStr?: string,
  plot?: string,
  directors?: string,
  writers?: string,
  stars?: string,
  genres?: string,
  trailerUrl?: string,

  statistics?: MovieStatistics,
}
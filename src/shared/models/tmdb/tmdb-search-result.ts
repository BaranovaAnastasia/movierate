import { TMDBMovie } from "./tmdb-movie";

export interface TMDBSearchResult {
  page: number,
  results: TMDBMovie[],
  total_results: number,
  total_pages: number
}
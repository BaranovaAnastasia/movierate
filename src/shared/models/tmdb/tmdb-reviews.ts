import { Review } from "../movie/review";

export interface TMDBReviews {
  id: string,
  results: Review[]
}
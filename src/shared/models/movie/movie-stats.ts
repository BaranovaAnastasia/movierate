export interface MovieStats {
  movieId: number,
  voteAvg: number,
  voteCount: number,
  watched: number,

  currentRating?: number,
  isWatched?: boolean,
  isFavourite?: boolean
}
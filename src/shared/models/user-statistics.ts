interface UserStatisticsGenre {
  genre: string,
  watched: number
}

export interface UserStatistics {
  movies: number,
  hours: number,
  reviews: number,
  genres: UserStatisticsGenre[]
}
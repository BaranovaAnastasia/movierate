import { Movie } from "../movie/movie";

export interface MoviesList {
  userId?: number;
  listId?: number;
  listName: string;
  isPublic?: boolean;
  movies: Movie[];
}
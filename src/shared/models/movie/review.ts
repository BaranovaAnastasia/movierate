export interface Review {
  movie_id: number;
  rating: number;
  title: string;
  review: string;
  created_at: Date;

  user_id: number;
  user_name: string;
  avatar_path: string;
}
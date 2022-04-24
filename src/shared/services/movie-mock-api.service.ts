import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IMovieApiService } from '../interfaces/IMovieApiService';
import { Movie } from '../models/movie';
import { MovieStatistics } from '../models/movie-statistics';
import { MoviesList } from '../models/movies-list';

const mockStatistics: MovieStatistics = {
  rating: 9.7,
  graded: 1524,
  watched: 2048
}

const mockMovies: Movie[] = [
  {
    id: "0",
    title: "Spencer",
    year: 2021,
    posterUrl: "https://i.pinimg.com/564x/d7/70/b2/d770b20991b903e8661220b1dbca4860.jpg",
    trailerUrl: "https://youtube.com/embed/WllZh9aekDg",
    genres: "Drama/Historical",
    runtimeMins: 117,
    runtimeStr: "1h 57m",
    plot: "Diana Spencer, struggling with mental-health problems during her Christmas holidays with the Royal Family at their Sandringham estate in Norfolk, England, decides to end her decade-long marriage to Prince Charles.",
    directors: "Pablo Larraín",
    writers: "Steven Knight",
    stars: "Kristen Stewart, Timothy Spall, Jack Nielen",
    statistics: mockStatistics,
  },
  {
    id: "1",
    title: "Guardians of the Galaxy",
    year: 2014,
    posterUrl: "https://i.pinimg.com/736x/11/32/55/113255356ba4345ba2733fdf7d2eaefb.jpg",
  },
  {
    id: "2",
    title: "Home Alone",
    year: 1990,
    posterUrl: "https://i.pinimg.com/564x/ba/2b/ec/ba2bec5e4d1a3a4a4ecd2402256122b4.jpg",
  },
  {
    id: "3",
    title: "The Shining",
    year: 1980,
    posterUrl: "https://i.pinimg.com/564x/f3/57/ab/f357abf66dc173d8397e81fba880c72e.jpg",
  },
  {
    id: "4",
    title: "Joker",
    year: 2019,
    posterUrl: "https://i.pinimg.com/564x/85/44/c2/8544c2ab18f93b4843d34bd68a095f62.jpg",
  },
  {
    id: "5",
    title: "Midsommar",
    year: 2019,
    posterUrl: "https://i.pinimg.com/564x/2f/42/6e/2f426e6052e1809ef93fd60ac22b03fd.jpg",
  },
]

const mockLists: MoviesList[] = [
  {
    id: '0',
    title: 'Highest Ranked',
    movies: mockMovies,
  },
  {
    id: '1',
    title: 'Popular Today',
    movies: mockMovies,
  },
  {
    id: '2',
    title: 'New Releases',
    movies: mockMovies,
  }
]


@Injectable({
  providedIn: 'root'
})
export class MovieMockApiService implements IMovieApiService {
  getMovieById(id: string): Observable<Movie> {
    return of(mockMovies.find(movie => movie.id === id)!);
  }
  getMoviesListById(id: string): Observable<MoviesList> {
    return of(mockLists.find(list => list.id === id)!);
  }
}

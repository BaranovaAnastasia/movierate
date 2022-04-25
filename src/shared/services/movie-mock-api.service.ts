import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IMovieApiService, MainListName } from '../interfaces/IMovieApiService';
import { Movie } from '../models/movie';
import { MovieStatistics } from '../models/movie-statistics';
import { MoviesList } from '../models/movies-list';

const mockStatistics: MovieStatistics[] = [
  {
    rating: 9.7,
    graded: 1524,
    watched: 2048
  },
  {
    rating: 8.2,
    graded: 1524,
    watched: 2048
  },
  {
    rating: 7.3,
    graded: 1524,
    watched: 2048
  },
  {
    rating: 6.8,
    graded: 1524,
    watched: 2048
  },
  {
    rating: 5.1,
    graded: 1524,
    watched: 2048
  },
  {
    rating: 4.5,
    graded: 1524,
    watched: 2048
  },
]

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
    statistics: mockStatistics[0],
  },
  {
    id: "1",
    title: "Guardians of the Galaxy",
    year: 2014,
    posterUrl: "https://i.pinimg.com/736x/11/32/55/113255356ba4345ba2733fdf7d2eaefb.jpg",

    trailerUrl: "https://youtube.com/embed/d96cjJhvlMA",
    genres: "Action/Comedy",
    runtimeMins: 121,
    runtimeStr: "2h 1m",
    plot: "A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.",
    directors: "James Gunn",
    writers: "James Gunn, Nicole Perlman, Dan Abnett",
    stars: "Chris Pratt, Vin Diesel, Bradley Cooper",
    statistics: mockStatistics[1],
  },
  {
    id: "2",
    title: "Home Alone",
    year: 1990,
    posterUrl: "https://i.pinimg.com/564x/ba/2b/ec/ba2bec5e4d1a3a4a4ecd2402256122b4.jpg",
    
    trailerUrl: "https://youtube.com/embed/jEDaVHmw7r4",
    genres: "Comedy/Family",
    runtimeMins: 103,
    runtimeStr: "1h 43m",
    plot: "An eight-year-old troublemaker must protect his house from a pair of burglars when he is accidentally left home alone by his family during Christmas vacation.",
    directors: "Chris Columbus",
    writers: "John Hughes",
    stars: "Macaulay Culkin, Joe Pesci, Daniel Stern",
    statistics: mockStatistics[2],
  },
  {
    id: "3",
    title: "The Shining",
    year: 1980,
    posterUrl: "https://i.pinimg.com/564x/f3/57/ab/f357abf66dc173d8397e81fba880c72e.jpg",
    statistics: mockStatistics[3],
  },
  {
    id: "4",
    title: "Joker",
    year: 2019,
    posterUrl: "https://i.pinimg.com/564x/85/44/c2/8544c2ab18f93b4843d34bd68a095f62.jpg",
    statistics: mockStatistics[4],
  },
  {
    id: "5",
    title: "Midsommar",
    year: 2019,
    posterUrl: "https://i.pinimg.com/564x/2f/42/6e/2f426e6052e1809ef93fd60ac22b03fd.jpg",
    statistics: mockStatistics[5],
  },
]

const mockLists: MoviesList[] = [
  {
    id: '0',
    title: 'Highest Ranked',
    moviesIds: ['0', '1', '2', '3', '4', '5'],
  },
  {
    id: '1',
    title: 'Popular Today',
    moviesIds: ['5', '4', '1', '2', '0', '3'],
  },
  {
    id: '2',
    title: 'New Releases',
    moviesIds: ['2', '0', '4', '3', '1', '5'],
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


  getMainListId(listName: MainListName): Observable<string> {
    switch (listName) {
      case 'ranked':
        return of("0");
      case 'popular':
        return of("1");
      case 'new':
        return of("2")
    }
  }
}

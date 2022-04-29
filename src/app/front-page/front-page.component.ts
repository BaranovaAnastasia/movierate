import { Component, Inject, OnInit } from '@angular/core';
import { IMoviesListApiService, IMoviesListApiServiceToken } from 'src/shared/interfaces/IMoviesListApi';
import { MoviesList } from 'src/shared/models/movies-list/movies-list';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.less']
})
export class FrontPageComponent implements OnInit {
  highestRanked!: MoviesList;
  popular!: MoviesList;
  // new!: MoviesList;
  upcoming!: MoviesList;

  constructor(
    @Inject(IMoviesListApiServiceToken)
    private moviesListApiService: IMoviesListApiService
  ) { }

  ngOnInit(): void {
    this.moviesListApiService.getTopRated().subscribe(list => {
      this.highestRanked = list;
    });
    this.moviesListApiService.getPopular().subscribe(list => {
      this.popular = list;
    });
    // this.moviesListApiService.getNew().subscribe(list => {
    //   this.new = list;
    // });
    this.moviesListApiService.getUpcoming().subscribe(list => {
      this.upcoming = list;
    });
  }

}

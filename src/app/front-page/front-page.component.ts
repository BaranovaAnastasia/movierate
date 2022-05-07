import { Component, Inject, OnInit } from '@angular/core';
import { IMoviesListApiService, IMoviesListApiServiceToken } from 'src/shared/interfaces';
import { MoviesList } from 'src/shared/models';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.less']
})
export class FrontPageComponent implements OnInit {
  highestRanked!: MoviesList;
  popular!: MoviesList;
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
    this.moviesListApiService.getUpcoming().subscribe(list => {
      this.upcoming = list;
    });
  }

}

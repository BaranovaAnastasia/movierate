import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  upcoming!: MoviesList;

  constructor(
    @Inject(IMoviesListApiServiceToken)
    private moviesListApiService: IMoviesListApiService,
    private route: ActivatedRoute
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

    // this.route.fragment.subscribe(fragment => {  
    //   if (fragment) {
    //     document.querySelector('#' + fragment)!.scrollIntoView();
    //   }
    // });
  }

}

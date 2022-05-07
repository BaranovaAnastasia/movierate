import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { IReviewsApiService, IReviewsApiServiceToken } from 'src/shared/interfaces/IReviewsApiService';
import { DEFAULT_MOVIE, Movie } from 'src/shared/models/movie/movie';
import { MovieStats } from 'src/shared/models/movie/movie-stats';
import { Review } from 'src/shared/models/movie/review';
import { MovieService } from 'src/shared/services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.less']
})
export class MovieComponent implements OnInit {
  movie$ = new Subject<Movie>();

  constructor(
    private movieService: MovieService,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedroute.params
      .subscribe(async routeParams => {
        this.movieService.getMovie(routeParams.id)
          .subscribe(result => this.movie$.next(result));
      });
  }

}

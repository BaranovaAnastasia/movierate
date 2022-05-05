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
  styleUrls: ['./movie.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent implements OnInit {
  movie$ = new Subject<Movie>();
  reviews$ = new Subject<Review[]>();

  constructor(
    private movieService: MovieService,
    @Inject(IReviewsApiServiceToken)
    private reviewsApiService: IReviewsApiService,
    private activatedroute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.activatedroute.params
      .subscribe(async routeParams => {
        this.movieService.constructFullMovie(routeParams.id, this.movie$);
        
        this.reviewsApiService.getMovieReviews(routeParams.id)
          .subscribe(result => this.reviews$.next(result));
      });
  }

  getSafeTrailerUrl(movie: Movie): SafeResourceUrl | undefined {
    return this.sanitizer.bypassSecurityTrustResourceUrl(movie.trailer?.embededUrl!);
  }

}

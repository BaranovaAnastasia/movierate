import { ChangeDetectionStrategy, Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { IUserMovieInteractionApiService, IUserMovieInteractionApiServiceToken } from 'src/shared/interfaces/IUserMovieInteractionApiService';
import { MovieStats } from 'src/shared/models/movie/movie-stats';

@Component({
  selector: 'app-movie-controls',
  templateUrl: './movie-controls.component.html',
  styleUrls: ['./movie-controls.component.less']
})
export class MovieControlsComponent implements OnInit, OnChanges {

  @Input() movieId?: string;

  voteAvg: number | undefined;
  voteCount: number | undefined;
  watched: number | undefined;

  ratingForm = this.fb.group({
    rating: [0]
  });

  isWatched: boolean | undefined;

  constructor(
    @Inject(IUserMovieInteractionApiServiceToken)
    private userMovieInteractionApiService: IUserMovieInteractionApiService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.requestStats();
    this.requestIsWatched();
    this.requestRating();

    const rating = this.ratingForm.get('rating')!;

    rating.valueChanges.pipe(
      switchMap(value =>
        this.userMovieInteractionApiService.rateMovie$(this.movieId!, value)
      )
    ).subscribe(stats => {
      this.updateStats(stats);
      this.isWatched = true;
    });
  }

  ngOnChanges(): void {
    this.requestStats();
    this.requestIsWatched();
    this.requestRating();
  }

  get watchedText(): string {
    return this.isWatched ? "watched!" : "add to watched";
  }

  markMovieAsWatched(): void {
    if (this.isWatched) {
      this.userMovieInteractionApiService.unwatchMovie$(this.movieId!)
        .subscribe(
          stats => {
            this.updateStats(stats);
            this.isWatched = false;
            this.ratingForm.setValue(
              { rating: null },
              { emitEvent: false }
            )
          }
        )
      return;
    }

    this.userMovieInteractionApiService.watchMovie$(this.movieId!)
      .subscribe(
        stats => {
          this.updateStats(stats);
          this.isWatched = true;
        }
      )
  }

  private requestStats(): void {
    if (!this.movieId) return;

    this.userMovieInteractionApiService.getStats$(this.movieId).subscribe(
      stats => this.updateStats(stats)
    );
  }

  private requestRating(): void {
    if (!this.movieId) return;

    this.userMovieInteractionApiService.getRating$(this.movieId).subscribe(
      rating => this.ratingForm.setValue(
        { rating: rating },
        { emitEvent: false }
      )
    );
  }

  private requestIsWatched(): void {
    if (!this.movieId) return;

    this.userMovieInteractionApiService.isWatched$(this.movieId).subscribe(
      isWatched => this.isWatched = isWatched
    );
  }

  private updateStats(stats: MovieStats): void {
    this.voteAvg = stats.voteAvg,
      this.voteCount = stats.voteCount,
      this.watched = stats.watched
  }

}

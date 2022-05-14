import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MovieStats } from 'src/shared/models';
import { UserMovieInteractionService } from 'src/shared/services';

@Component({
  selector: 'app-movie-controls',
  templateUrl: './movie-controls.component.html',
  styleUrls: ['./movie-controls.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieControlsComponent implements OnChanges {
  @Input() movieId!: string;

  movieStats$!: Observable<MovieStats | undefined>;

  constructor(
    private userMovieInteractionService: UserMovieInteractionService,
  ) { }

  ngOnChanges(): void {
    this.movieStats$ = this.userMovieInteractionService.getStats$(this.movieId);
  }

  postRating(value: number) {
    this.movieStats$ = this.userMovieInteractionService.rateMovie$(
      this.movieId,
      value,
    );
  }

  watchMovie(doWatch: boolean): void {
    if (doWatch) {
      this.movieStats$ = this.userMovieInteractionService.watchMovie$(
        this.movieId,
      );
      return;
    }

    this.movieStats$ = this.userMovieInteractionService.unwatchMovie$(
      this.movieId,
    );
  }

  movieToFavourites(addToFavourites: boolean): void {
    if (addToFavourites) {
      this.movieStats$ = this.userMovieInteractionService.addMovieToFavourites$(
        this.movieId,
      );
      return;
    }

    this.movieStats$ =
      this.userMovieInteractionService.removeMovieFromFavourites$(this.movieId);
  }
}

import { Component, Inject, Injector, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TuiDialogService } from '@taiga-ui/core';
import { switchMap } from 'rxjs/operators';
import { MovieStats } from 'src/shared/models';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { AuthService, FavouritesService, UserMovieInteractionService } from 'src/shared/services';
import { ListSelectDialogComponent } from './list-select-dialog/list-select-dialog.component';

@Component({
  selector: 'app-movie-controls',
  templateUrl: './movie-controls.component.html',
  styleUrls: ['./movie-controls.component.less']
})
export class MovieControlsComponent implements OnInit, OnChanges {

  @Input() movieId?: string;

  voteAvg: string | undefined;
  voteCount: number | undefined;
  watched: number | undefined;

  isWatched: boolean | undefined;
  isFavourite: boolean | undefined;

  ratingForm = this.fb.group({
    rating: [0]
  });

  constructor(
    private userMovieInteractionService: UserMovieInteractionService,
    private favouritesService: FavouritesService,
    private authService: AuthService,
    private fb: FormBuilder,

    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
  ) { }

  ngOnInit(): void {
    this.requestStats();

    const rating = this.ratingForm.get('rating')!;

    rating.valueChanges.pipe(
      switchMap(value =>
        this.userMovieInteractionService.rateMovie$(this.movieId!, value * 2)
      )
    ).subscribe(stats => this.updateStats(stats));
  }

  ngOnChanges(): void {
    this.requestStats();
  }

  get watchedText(): string {
    return this.isWatched ? "watched!" : "add to watched";
  }
  get favouritesText(): string {
    return this.isFavourite ? "favourite!" : "add to favourites";
  }

  markMovieAsWatched(): void {
    if (this.isWatched) {
      this.userMovieInteractionService.unwatchMovie$(this.movieId!)
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

    this.userMovieInteractionService.watchMovie$(this.movieId!)
      .subscribe(stats => this.updateStats(stats))
  }

  markAsFavourites(): void {
    if (this.isFavourite) {
      this.favouritesService.removeMovieFromFavourites$(this.movieId!)
        .subscribe(() => this.isFavourite = false);
      return;
    }
    this.favouritesService.addMovieToFavourites$(this.movieId!)
      .subscribe(() => this.isFavourite = true);
  }

  private requestStats(): void {
    if (!this.movieId) return;

    this.userMovieInteractionService.getStats$(this.movieId).subscribe(
      stats => this.updateStats(stats)
    );
  }

  private updateStats(stats: MovieStats): void {
    this.voteAvg = stats.voteAvg.toFixed(1);
    this.voteCount = stats.voteCount;
    this.watched = stats.watched;

    this.isFavourite = stats.isFavourite;
    this.isWatched = stats.isWatched;
    this.ratingForm.patchValue(
      { rating: stats.currentRating! / 2 },
      { emitEvent: false }
    )
  }

  openAddToListDialog(): void {
    if (!this.authService.toSignInIfNotAuthorized()) {
      return;
    }
    this.dialogService
      .open(
        new PolymorpheusComponent(ListSelectDialogComponent, this.injector),
        {
          data: this.movieId,
          size: 's'
        }
      )
      .subscribe();
  }

}

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-movie-to-favourite',
  templateUrl: './movie-to-favourite.component.html',
  styleUrls: ['./movie-to-favourite.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieToFavouriteComponent implements OnChanges {
  @Input() isFavourite?: boolean;
  @Output() favouriteChanges = new EventEmitter<boolean>();

  ngOnChanges(changes: SimpleChanges): void {
    this.isFavourite =
      typeof changes.isFavourite.currentValue === 'boolean'
        ? changes.isFavourite.currentValue
        : changes.isFavourite.previousValue;
  }

  get favouritesText(): string {
    return this.isFavourite ? 'favourite!' : 'add to favourites';
  }

  addToFavourites(): void {
    this.favouriteChanges.emit(!this.isFavourite);
  }
}

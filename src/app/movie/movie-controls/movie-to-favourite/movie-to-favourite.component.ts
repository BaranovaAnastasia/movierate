import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-movie-to-favourite',
  templateUrl: './movie-to-favourite.component.html',
  styleUrls: ['./movie-to-favourite.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieToFavouriteComponent {
  @Input() isFavourite?: boolean;
  @Output() onFavouriteChanges = new EventEmitter<boolean>();

  get favouritesText(): string {
    return this.isFavourite ? "favourite!" : "add to favourites";
  }

  addToFavourites(): void {
    this.onFavouriteChanges.emit(!this.isFavourite);
  }
}

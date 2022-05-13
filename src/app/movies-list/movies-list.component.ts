import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { concat } from 'rxjs';
import { Movie, MoviesList } from 'src/shared/models';
import { ListsService } from 'src/shared/services';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesListComponent {
  @Input() list!: MoviesList;
  @Input() editable: boolean = false;

  @Output() onListDelete = new EventEmitter<number>();

  nowEditing: boolean = false;

  toDelete: string[] = [];

  constructor(
    private listsService: ListsService
  ) { }

  get visibilityText(): string {
    return this.list.isPublic ? 'Public' : 'Private';
  }

  get isEmpty(): boolean {
    return !this.list.movies
      || this.list.movies.length === 0
      || this.list.movies.length === this.toDelete.length;
  }

  get displayMovies(): Movie[] {
    return this.list.movies!.filter(movie => !this.toDelete.includes(movie.id));
  }

  startEditing(): void {
    if (!this.editable) return;
    this.nowEditing = true;
  }

  finishEditing(edit: boolean): void {
    this.nowEditing = false;

    if (edit) {
      concat(
        ...this.toDelete.map(
          id => this.listsService.removeMovieFromList$(id, this.list.listId!)
        )
      ).subscribe(list => {
        this.toDelete = [];
        this.list = list;
      });

      return;
    }
    this.toDelete = [];
  }

  deleteMovie(movie: Movie): void {
    this.toDelete.push(movie.id);
  }

  deleteList(): void {
    this.onListDelete.emit(this.list.listId);
  }

  isPreparedForDelete(movie: Movie): boolean {
    return this.toDelete.includes(movie.id);
  }

}

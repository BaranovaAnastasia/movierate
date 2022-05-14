import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { concat } from 'rxjs';
import { Movie, MoviesList } from 'src/shared/models';
import { ListsService } from 'src/shared/services';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesListComponent {
  @Input() list?: MoviesList;
  @Input() editable: boolean = false;

  @Output() delete = new EventEmitter<number>();

  nowEditing: boolean = false;

  toDelete: string[] = [];

  constructor(
    private listsService: ListsService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  get visibilityText(): string {
    return this.list!.isPublic ? 'Public' : 'Private';
  }

  get isEmpty(): boolean {
    return (
      !this.list!.movies ||
      this.list!.movies.length === 0 ||
      this.list!.movies.length === this.toDelete.length
    );
  }

  get displayMovies(): Movie[] {
    return this.list!.movies!.filter(
      movie => !this.toDelete.includes(movie.id),
    );
  }

  startEditing(): void {
    if (!this.editable) return;
    this.nowEditing = true;
  }

  finishEditing(edit: boolean): void {
    if (edit && this.toDelete.length > 0) {
      concat(
        ...this.toDelete.map(id =>
          this.listsService.removeMovieFromList$(id, this.list!.listId!),
        ),
      ).subscribe(
        list => {
          this.toDelete = [];
          this.list = list;
          this.nowEditing = false;
          this.changeDetectorRef.detectChanges();
        },
        () => {},
      );

      return;
    }

    this.nowEditing = false;
    this.toDelete = [];
  }

  deleteMovie(movie: Movie): void {
    this.toDelete.push(movie.id);
  }

  deleteList(): void {
    this.delete.emit(this.list!.listId);
  }

  isPreparedForDelete(movie: Movie): boolean {
    return this.toDelete.includes(movie.id);
  }
}

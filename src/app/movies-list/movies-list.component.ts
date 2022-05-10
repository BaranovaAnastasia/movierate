import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { Movie, MoviesList } from 'src/shared/models';
import { ListsService } from 'src/shared/services';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.less']
})
export class MoviesListComponent {
  @Input() list!: MoviesList;
  @Input() editable: boolean = false;
  @Output() onListDelete = new EventEmitter<number>();

  nowEditing: boolean = false;

  form = this.fb.group({
    name: [null, Validators.required],
    visibility: [null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private listsService: ListsService,
    private readonly alertService: TuiAlertService,
  ) { }

  get visibilityText(): string {
    return this.list.isPublic ? 'Public' : 'Private';
  }

  get isEmpty(): boolean {
    return !this.list.movies || this.list.movies.length === 0
  }

  startEditing(): void {
    if(!this.editable) return;
    
    this.form.patchValue({
      name: this.list.listName,
      visibility: this.list.isPublic ? 'public' : 'private'
    });

    this.nowEditing = true;
  }

  submitEditing(): void {
    const data = this.form.getRawValue();
    const newIsPublic = data.visibility === 'public';

    if (data.name === this.list.listName && newIsPublic === this.list.isPublic) {
      this.nowEditing = false;
      return;
    }

    this.listsService.editList$(
      this.list.listId!,
      data.name,
      newIsPublic
    ).subscribe(
      () => {
        this.list.listName = data.name;
        this.list.isPublic = newIsPublic;
        this.nowEditing = false;
      },
      () => {
        this.alertService.open(
          'A list with this name already exists. Try something else.',
          {
            status: TuiNotification.Error,
            label: 'Try another name.'
          }
        ).subscribe();
      }
    )
  }

  deleteMovie(movie: Movie): void {
    this.listsService.removeMovieFromList$(movie.id, this.list.listId!)
      .subscribe(
        () => this.list.movies = this.list.movies?.filter(item => item.id !== movie.id)
      );
  }

  deleteList(): void {
    this.onListDelete.emit(this.list.listId);
  }

}

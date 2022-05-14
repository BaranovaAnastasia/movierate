import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { concatMap } from 'rxjs/operators';
import { ListsService } from 'src/shared/services';
import { VISIBILITY_PRIVATE, VISIBILITY_PUBLIC } from '../../constants';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateListComponent implements OnInit {
  @Input() movieId!: string;
  @Output() ready = new EventEmitter<void>();

  form = this.fb.group({
    name: [null, Validators.required],
    visibility: [VISIBILITY_PUBLIC, Validators.required],
  });

  visibility = [VISIBILITY_PUBLIC, VISIBILITY_PRIVATE];

  unsuccessful: boolean = false;

  constructor(private fb: FormBuilder, private listsService: ListsService) {}

  ngOnInit(): void {
    this.form.controls.name.valueChanges.subscribe(
      () => (this.unsuccessful = false),
    );
  }

  createAndAdd(): void {
    const listData = this.form.getRawValue();

    this.listsService
      .createList$(listData.name, listData.visibility === VISIBILITY_PUBLIC)
      .pipe(
        concatMap(list =>
          this.listsService.addMovieToList$(this.movieId, list.listId!),
        ),
      )
      .subscribe(
        () => this.ready.emit(),
        () => {},
      );
  }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { concatMap } from 'rxjs/operators';
import { ListsService } from 'src/shared/services';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateListComponent implements OnInit {
  @Input() movieId!: string;
  @Output() onReady = new EventEmitter<void>();

  form = this.fb.group({
    name: [null, Validators.required],
    visibility: ['public', Validators.required]
  });

  unsuccessful: boolean = false;

  constructor(
    private fb: FormBuilder,
    private listsService: ListsService,
  ) { }

  ngOnInit(): void {
    this.form.controls.name.valueChanges
      .subscribe(() => this.unsuccessful = false)
  }

  createAndAdd(): void {
    const listData = this.form.getRawValue();

    this.listsService.createList$(
      listData.name,
      listData.visibility === 'public'
    ).pipe(
      concatMap(list => this.listsService.addMovieToList$(this.movieId, list.listId!))
    ).subscribe(
      () => this.onReady.emit(),
      () => this.unsuccessful = true
    );
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MoviesList } from 'src/shared/models';
import { ListsService } from 'src/shared/services';
import { VISIBILITY_PRIVATE, VISIBILITY_PUBLIC } from '../constants';

@Component({
  selector: 'app-list-edit-form',
  templateUrl: './list-edit-form.component.html',
  styleUrls: ['./list-edit-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListEditFormComponent implements OnInit {
  @Input() list!: MoviesList;
  @Output() ready = new EventEmitter<boolean>();

  form = this.fb.group({
    name: [null, Validators.required],
    visibility: [null, Validators.required],
  });

  visibility = [VISIBILITY_PUBLIC, VISIBILITY_PRIVATE];

  constructor(private fb: FormBuilder, private listsService: ListsService) {}

  ngOnInit(): void {
    this.form.patchValue({
      name: this.list.listName,
      visibility: this.list.isPublic ? VISIBILITY_PUBLIC : VISIBILITY_PRIVATE,
    });
  }

  get inputWidth(): number {
    return Math.max(this.form.controls.name.value.length, 5);
  }

  submit(): void {
    const data = this.form.getRawValue();
    const newIsPublic = data.visibility === VISIBILITY_PUBLIC;

    if (
      data.name === this.list.listName &&
      newIsPublic === this.list.isPublic
    ) {
      this.ready.emit(true);
      return;
    }

    this.listsService
      .editList$(this.list.listId!, data.name, newIsPublic)
      .subscribe(
        () => {
          this.list.listName = data.name;
          this.list.isPublic = newIsPublic;
          this.ready.emit(true);
        },
        () => {},
      );
  }

  cancelEditing(): void {
    this.ready.emit(false);
  }
}

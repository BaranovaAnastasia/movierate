import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { MoviesList } from 'src/shared/models';
import { ListsService } from 'src/shared/services';

@Component({
  selector: 'app-list-edit-form',
  templateUrl: './list-edit-form.component.html',
  styleUrls: ['./list-edit-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListEditFormComponent implements OnInit {
  @Input() list!: MoviesList;
  @Output() onReady = new EventEmitter<boolean>();

  form = this.fb.group({
    name: [null, Validators.required],
    visibility: [null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private listsService: ListsService,
    private readonly alertService: TuiAlertService,
  ) { }

  ngOnInit(): void {
    this.form.patchValue({
      name: this.list.listName,
      visibility: this.list.isPublic ? 'public' : 'private'
    });
  }

  get inputWidth(): number {
    return Math.max(this.form.controls.name.value.length, 5);
  }

  submit(): void {
    const data = this.form.getRawValue();
    const newIsPublic = data.visibility === 'public';

    if (data.name === this.list.listName && newIsPublic === this.list.isPublic) {
      this.onReady.emit(true);
      return;
    }

    this.listsService
      .editList$(this.list.listId!, data.name, newIsPublic)
      .subscribe(
        () => {
          this.list.listName = data.name;
          this.list.isPublic = newIsPublic;
          this.onReady.emit(true);
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

  cancelEditing(): void {
    this.onReady.emit(false);
  }

}

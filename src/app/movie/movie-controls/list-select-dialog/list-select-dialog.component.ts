import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ListsService } from 'src/shared/services';
import { TuiDialogContext } from '@taiga-ui/core';
import { MoviesList } from 'src/shared/models';

@Component({
  selector: 'app-list-select-dialog',
  templateUrl: './list-select-dialog.component.html',
  styleUrls: ['./list-select-dialog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListSelectDialogComponent implements OnInit {
  lists?: MoviesList[];
  activeItemIndex = 0;

  form = this.fb.group({
    name: [null, Validators.required],
    visibility: ['Public', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private listsService: ListsService,
    @Inject(POLYMORPHEUS_CONTEXT) readonly context: TuiDialogContext<boolean>
  ) { }

  ngOnInit(): void {
    this.listsService.getAllListsCurrent$()
      .subscribe(lists => this.lists = lists)
  }

  close(): void {
    this.context.completeWith(true);
  }
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';
import { MoviesList, User } from 'src/shared/models';
import { ListsService } from 'src/shared/services';

@Component({
  selector: 'app-user-lists',
  templateUrl: './user-lists.component.html',
  styleUrls: ['./user-lists.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListsComponent implements OnChanges {
  @Input() user!: User;

  lists: MoviesList[] = [];

  constructor(
    private listsService: ListsService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnChanges(): void {
    this.listsService.getAllUserLists$(this.user.id)
      .subscribe(lists => {
        this.lists = Array(lists.length);

        lists.forEach((list, index) => {
          this.listsService.getList$(list.listId!)
            .subscribe(result => {
              this.lists[index] = result;
              this.changeDetectorRef.detectChanges();
            });
        }
        );
      });
  }

  deleteList(listToDelete: MoviesList): void {
    this.listsService.deleteList$(listToDelete.listId!)
      .subscribe(() => {
        this.lists = this.lists.filter(list => list.listId !== listToDelete.listId);
        this.changeDetectorRef.detectChanges();
      });
  }

}

import { ChangeDetectionStrategy, Component, Inject, Injector, Input } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { AuthService } from 'src/shared/services';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { ListSelectDialogComponent } from '../list-select-dialog/list-select-dialog.component';

@Component({
  selector: 'app-movie-to-list',
  templateUrl: './movie-to-list.component.html',
  styleUrls: ['./movie-to-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieToListComponent {
  @Input() movieId?: string;

  constructor(
    private authService: AuthService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) { }

  openAddToListDialog(): void {
    if (!this.authService.toSignInIfNotAuthorized()) {
      return;
    }
    
    this.dialogService
      .open(
        new PolymorpheusComponent(ListSelectDialogComponent, this.injector),
        {
          data: this.movieId,
          size: 's'
        }
      )
      .subscribe();
  }

}

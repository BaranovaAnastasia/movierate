import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListsService } from 'src/shared/services';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrontPageComponent {
  highestRanked$ = this.listsService.getTopRated$();
  popular$ = this.listsService.getPopular$();
  upcoming$ = this.listsService.getUpcoming$();

  constructor(private listsService: ListsService) {}
}

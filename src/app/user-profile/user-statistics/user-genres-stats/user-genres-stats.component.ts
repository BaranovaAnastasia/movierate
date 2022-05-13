import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';
import { UserService } from 'src/shared/services';

@Component({
  selector: 'app-user-genres-stats',
  templateUrl: './user-genres-stats.component.html',
  styleUrls: ['./user-genres-stats.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserGenresStatsComponent implements OnChanges {
  @Input() userId!: number;

  genresCounts?: number[];
  genresNames?: string[];

  constructor(
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnChanges(): void {
    this.userService.getUserGenresStats$(this.userId)
      .subscribe(
        genresStats => {
          this.genresCounts = genresStats.map(stats => stats.movies_count);
          this.genresNames = genresStats.map(stats => stats.genre_name);
          this.changeDetectorRef.detectChanges();
        }
      );
  }

}

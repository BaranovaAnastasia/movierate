import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-watched-stats',
  templateUrl: './movie-watched-stats.component.html',
  styleUrls: ['./movie-watched-stats.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieWatchedStatsComponent {
  @Input() value?: number;

}

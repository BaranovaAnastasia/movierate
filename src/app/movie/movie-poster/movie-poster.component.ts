import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-poster',
  templateUrl: './movie-poster.component.html',
  styleUrls: ['./movie-poster.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviePosterComponent {
  @Input() src?: string;
}

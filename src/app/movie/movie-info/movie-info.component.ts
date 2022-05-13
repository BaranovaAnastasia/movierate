import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Movie } from 'src/shared/models';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieInfoComponent {
  @Input() movie!: Movie;

}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MovieService } from 'src/shared/services';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieComponent {
  movie$ = this.activatedRoute.params.pipe(
    switchMap(params => this.movieService.getMovie$(params.id)),
  );

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
  ) {}
}

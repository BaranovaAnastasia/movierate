import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Credits } from 'src/shared/models';
import { MovieService } from 'src/shared/services';

@Component({
  selector: 'app-movie-credits',
  templateUrl: './movie-credits.component.html',
  styleUrls: ['./movie-credits.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieCreditsComponent implements OnInit {
  @Input() movieId!: string;

  credits$?: Observable<Credits>;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.credits$ = this.movieService.getCredits$(this.movieId);
  }

}

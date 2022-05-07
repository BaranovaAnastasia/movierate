import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Movie } from 'src/shared/models';
import { MovieService } from 'src/shared/services';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.less']
})
export class MovieComponent implements OnInit {
  movie$ = new Subject<Movie>();

  constructor(
    private movieService: MovieService,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedroute.params
      .subscribe(async routeParams => {
        this.movieService.getMovie(routeParams.id)
          .subscribe(result => this.movie$.next(result));
      });
  }

}

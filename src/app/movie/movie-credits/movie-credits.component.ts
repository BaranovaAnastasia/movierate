import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Credits } from 'src/shared/models/movie/credits';
import { MovieService } from 'src/shared/services/movie.service';

@Component({
  selector: 'app-movie-credits',
  templateUrl: './movie-credits.component.html',
  styleUrls: ['./movie-credits.component.less']
})
export class MovieCreditsComponent implements OnInit {
  credits$ = new Subject<Credits>();

  constructor(
    private activatedroute: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.activatedroute.params.subscribe(
      async routeParams => {
        this.movieService.getCredits(routeParams.id)
          .subscribe(result => this.credits$?.next(result));
      }
    );
  }

}

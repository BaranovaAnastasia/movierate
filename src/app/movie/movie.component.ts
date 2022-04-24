import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/shared/models/movie';
import { MovieService } from 'src/shared/services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.less']
})
export class MovieComponent implements OnInit {
  movie!: Movie;

  constructor(
    private movieService: MovieService,
    private activatedroute: ActivatedRoute,
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.activatedroute.params.subscribe(routeParams => {
      this.movieService.getMovieById(routeParams.id).subscribe(
        movie => {
          this.movie = movie;
        }
      )
    });
  }

  get safeTrailerUrl(): SafeResourceUrl {
    return this._sanitizer.bypassSecurityTrustResourceUrl(
      this.movie.trailerUrl!
    );
  }

}

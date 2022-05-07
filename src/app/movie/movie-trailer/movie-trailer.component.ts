import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Trailer } from 'src/shared/models';
import { MovieService } from 'src/shared/services';

@Component({
  selector: 'app-movie-trailer',
  templateUrl: './movie-trailer.component.html',
  styleUrls: ['./movie-trailer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieTrailerComponent implements OnInit {
  trailer$ = new BehaviorSubject<Trailer | undefined>(undefined);

  safeUrl$: Observable<SafeResourceUrl | undefined> = this.trailer$.pipe(
    map(trailer => {
      if (!trailer) return undefined;
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        `http://www.youtube.com/embed/${trailer.key}`
      )
    })
  );

  previewUrl$: Observable<string | undefined> = this.trailer$.pipe(
    map(trailer => {
      if (!trailer) return undefined;
      return `https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`;
    })
  );

  name$: Observable<string | undefined> = this.trailer$.pipe(
    map(trailer => trailer?.name)
  );

  videoShown: boolean = false;

  constructor(
    private sanitizer: DomSanitizer,
    private activatedroute: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.activatedroute.params.subscribe(
      async routeParams => {
        this.movieService.getTrailer(routeParams.id)
          .subscribe(result => this.trailer$?.next(result));
      }
    );
  }

  showVideo() {
    this.videoShown = true;
  }

}

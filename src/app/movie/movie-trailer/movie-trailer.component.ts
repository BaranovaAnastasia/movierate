import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Trailer } from 'src/shared/models';
import { MovieService } from 'src/shared/services';

@Component({
  selector: 'app-movie-trailer',
  templateUrl: './movie-trailer.component.html',
  styleUrls: ['./movie-trailer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieTrailerComponent implements OnChanges {
  @Input() movieId!: string;

  trailer$?: Observable<Trailer | undefined>;
  safeUrl$?: Observable<SafeResourceUrl | undefined>;
  previewUrl$?: Observable<string | undefined>;
  name$?: Observable<string | undefined>;

  videoShown: boolean = false;

  constructor(
    private sanitizer: DomSanitizer,
    private movieService: MovieService,
  ) {}

  ngOnChanges(): void {
    this.trailer$ = this.movieService.getTrailer$(this.movieId);

    this.safeUrl$ = this.trailer$.pipe(
      map(trailer => {
        if (!trailer) return undefined;
        return this.sanitizer.bypassSecurityTrustResourceUrl(
          `http://www.youtube.com/embed/${trailer.key}`,
        );
      }),
    );

    this.previewUrl$ = this.trailer$.pipe(
      map(trailer => {
        if (!trailer) return undefined;
        return `https://img.youtube.com/vi/${trailer.key}/maxresdefault.jpg`;
      }),
    );

    this.name$ = this.trailer$.pipe(map(trailer => trailer?.name));
  }

  showVideo() {
    this.videoShown = true;
  }
}

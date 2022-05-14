import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
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
  safeUrl?: SafeResourceUrl | undefined;
  previewUrl?: string | undefined;
  name?: string | undefined;

  videoShown: boolean = false;

  constructor(
    private sanitizer: DomSanitizer,
    private movieService: MovieService
  ) { }

  ngOnChanges(): void {
    this.trailer$ = this.movieService.getTrailer$(this.movieId)
      .pipe(
        tap(trailer => {
          this.safeUrl = trailer
            ? this.sanitizer.bypassSecurityTrustResourceUrl(
              `http://www.youtube.com/embed/${trailer.key}`,
            )
            : undefined;

          this.previewUrl = trailer
            ? `https://img.youtube.com/vi/${trailer.key}/maxresdefault.jpg`
            : undefined;

          this.name = trailer?.name
        })
      );
  }

  showVideo() {
    this.videoShown = true;
  }
}

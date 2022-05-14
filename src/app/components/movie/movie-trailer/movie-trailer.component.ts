import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Trailer } from 'src/shared/models';
import { MovieService } from 'src/shared/services';
import { TRAILER_PREVIEW_QUALITY_URL, TRAILER_PREVIEW_URL, TRAILER_URL } from './constants';

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
    private movieService: MovieService,
  ) {}

  ngOnChanges(): void {
    this.trailer$ = this.movieService.getTrailer$(this.movieId).pipe(
      tap(trailer => {
        this.safeUrl = trailer
          ? this.sanitizer.bypassSecurityTrustResourceUrl(
              `${TRAILER_URL}${trailer.key}`,
            )
          : undefined;

        this.previewUrl = trailer
          ? `${TRAILER_PREVIEW_URL}${trailer.key}${TRAILER_PREVIEW_QUALITY_URL}`
          : undefined;

        this.name = trailer?.name;
      }),
    );
  }

  showVideo() {
    this.videoShown = true;
  }
}

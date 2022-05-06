import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Trailer } from 'src/shared/models/movie/trailer';

@Component({
  selector: 'app-movie-trailer',
  templateUrl: './movie-trailer.component.html',
  styleUrls: ['./movie-trailer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieTrailerComponent {
  safeUrl?: SafeResourceUrl;
  previewUrl?: string;
  name?: string;

  videoShown: boolean = false;

  constructor(private sanitizer: DomSanitizer) { }

  @Input()
  set trailer(trailer: Trailer) {
    const url = `http://www.youtube.com/embed/${trailer.key}`
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    this.previewUrl = `https://img.youtube.com/vi/${trailer.key}/maxresdefault.jpg`;

    this.name = trailer.name;
  }

  showVideo() {
    this.videoShown = true;
  }

}

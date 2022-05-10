import { Component, Input } from '@angular/core';
import { MoviesList } from 'src/shared/models';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.less']
})
export class MoviesListComponent {
  @Input() list!: MoviesList;

  get visibilityText(): string {
    return this.list.isPublic ? 'Public' : 'Private';
  }

  get isEmpty(): boolean {
    return !this.list.movies || this.list.movies.length === 0
  }

}

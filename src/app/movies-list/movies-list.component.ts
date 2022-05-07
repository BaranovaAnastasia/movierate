import { Component, Input } from '@angular/core';
import { MoviesList } from 'src/shared/models';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.less']
})
export class MoviesListComponent {
  @Input() list!: MoviesList;

}

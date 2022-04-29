import { Component, Input, OnInit } from '@angular/core';
import { MoviesList } from 'src/shared/models/movies-list/movies-list';
import { MovieService } from 'src/shared/services/movie.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.less']
})
export class MoviesListComponent {
  @Input() list!: MoviesList;

}

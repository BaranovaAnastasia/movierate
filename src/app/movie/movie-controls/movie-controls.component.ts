import { Component, Input, OnInit } from '@angular/core';
import { MovieStatistics } from 'src/shared/models/movie-statistics';

@Component({
  selector: 'app-movie-controls',
  templateUrl: './movie-controls.component.html',
  styleUrls: ['./movie-controls.component.less']
})
export class MovieControlsComponent {

  @Input() statistics!: MovieStatistics;

}

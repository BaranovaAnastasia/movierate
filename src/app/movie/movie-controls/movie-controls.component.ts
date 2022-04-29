import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-controls',
  templateUrl: './movie-controls.component.html',
  styleUrls: ['./movie-controls.component.less']
})
export class MovieControlsComponent {

  @Input() vote_average: number | undefined;
  @Input() vote_count: number | undefined;
  @Input() watched: number | undefined;

}

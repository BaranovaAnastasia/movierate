import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/shared/services/movie.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.less']
})
export class FrontPageComponent implements OnInit {
  highestRankedId!: string;
  popularId!: string;
  newId!: string;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getMainListId('ranked').subscribe(id => {
      this.highestRankedId = id;
    });
    this.movieService.getMainListId('popular').subscribe(id => {
      this.popularId = id;
    });
    this.movieService.getMainListId('new').subscribe(id => {
      this.newId = id;
    });
  }

}

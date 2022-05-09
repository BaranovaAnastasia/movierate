import { Component, OnInit } from '@angular/core';
import { MoviesList } from 'src/shared/models';
import { ListsService } from 'src/shared/services';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.less']
})
export class FrontPageComponent implements OnInit {
  highestRanked!: MoviesList;
  popular!: MoviesList;
  upcoming!: MoviesList;

  constructor(
    private listsService: ListsService
  ) { }

  ngOnInit(): void {
    this.listsService.getTopRated().subscribe(list => {
      this.highestRanked = list;
    });
    this.listsService.getPopular().subscribe(list => {
      this.popular = list;
    });
    this.listsService.getUpcoming().subscribe(list => {
      this.upcoming = list;
    });
  }

}

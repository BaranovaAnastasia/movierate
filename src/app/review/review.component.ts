import { Component, Input, OnInit } from '@angular/core';
import { Review } from 'src/shared/models/movie/review';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.less']
})
export class ReviewComponent implements OnInit {
  @Input() review!: Review;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, Inject, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IReviewsApiService, IReviewsApiServiceToken } from 'src/shared/interfaces/IReviewsApiService';
import { Review } from 'src/shared/models/movie/review';
import { ReviewsService } from 'src/shared/services/reviews/reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.less']
})
export class ReviewsComponent implements OnInit {
  @Input() movieId?: string;
  reviews$ = new Subject<Review[]>();

  expanded = false;

  constructor(
    private reviewsService: ReviewsService,
  ) { }

  ngOnInit(): void {
    this.reviewsService.getMovieReviews(this.movieId!)
      .subscribe(result => this.reviews$.next(result));
  }

  toggle() {
    this.expanded = !this.expanded;
  }

  postReview(review: Review) {
    this.expanded = false;
    this.reviewsService.postReview(this.movieId!, review)
      .subscribe(result => this.reviews$.next(result));
  }

}

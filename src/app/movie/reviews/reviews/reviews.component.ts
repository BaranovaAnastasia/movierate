import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Review } from 'src/shared/models';
import { ReviewsService } from 'src/shared/services';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.less']
})
export class ReviewsComponent implements OnInit {
  movieId!: string;
  reviews$ = new Subject<Review[]>();

  expanded = false;

  constructor(
    private reviewsService: ReviewsService,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedroute.params.subscribe(
      async routeParams => {
        this.movieId = routeParams.id;
        this.reviewsService.getMovieReviews(routeParams.id)
          .subscribe(result => this.reviews$.next(result))
      }
    );
  }

  toggle() {
    this.expanded = !this.expanded;
  }

  postReview(review: Review) {
    this.expanded = false;
    this.reviewsService.postReview(this.movieId, review)
      .subscribe(result => this.reviews$.next(result));
  }

}

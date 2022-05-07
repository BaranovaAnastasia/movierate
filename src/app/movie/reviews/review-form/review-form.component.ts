import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Review } from 'src/shared/models';
import { UserMovieInteractionService } from 'src/shared/services';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.less']
})
export class ReviewFormComponent implements OnInit {
  @Input() movieId?: string;
  @Output()
  postReview = new EventEmitter<Review>();

  form = this.fb.group({
    rating: [null, Validators.required],
    title: [null, [Validators.required, Validators.minLength(3)]],
    review: [null, [Validators.required, Validators.minLength(20)]]
  });

  constructor(
    private userMovieInteractionService: UserMovieInteractionService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    if(!this.movieId) return;

    this.userMovieInteractionService.getRating$(this.movieId).subscribe(
      rating => this.form.patchValue(
        { rating },
        { emitEvent: false }
      )
    );
  }

  submit() {
    const review = this.form.getRawValue();
    this.postReview.next(review);
    this.form.reset();
  }

}

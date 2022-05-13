import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-movie-rating-form',
  templateUrl: './movie-rating-form.component.html',
  styleUrls: ['./movie-rating-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieRatingFormComponent implements OnInit, OnChanges {
  @Input() value?: number;
  @Output() onValueChanges = new EventEmitter<number>();

  ratingForm = this.fb.group({
    rating: [null]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.ratingForm.controls.rating.valueChanges
      .subscribe(
        value => this.onValueChanges.emit(value * 2)
      );
  }

  ngOnChanges(): void {
    this.ratingForm.patchValue(
      { rating: this.value! / 2 },
      { emitEvent: false }
    );
  }
}

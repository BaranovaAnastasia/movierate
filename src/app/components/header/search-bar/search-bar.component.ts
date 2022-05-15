import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { debounceTime, map, switchMap, takeUntil } from 'rxjs/operators';
import { MovieService } from 'src/shared/services';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements OnDestroy {
  readonly destroy$ = new Subject<void>();

  search = this.fb.control(null);

  results$ = this.search.valueChanges.pipe(
    debounceTime(200),
    switchMap(value => {
      if (!value) return of(null);

      return this.movieService
        .searchMovies(value)
        .pipe(map(movies => movies.slice(0, 10)));
    }),
    takeUntil(this.destroy$),
  );

  expanded: boolean = false;

  constructor(private fb: FormBuilder, private movieService: MovieService) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  reset(): void {
    this.expanded = false;
    this.search.reset();
  }

  expand(): void {
    console.log('here')
    this.expanded = true;
  }
}

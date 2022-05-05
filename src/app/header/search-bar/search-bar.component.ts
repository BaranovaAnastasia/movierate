import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EMPTY, Observable, of, Subject } from 'rxjs';
import { debounceTime, filter, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { Movie } from 'src/shared/models/movie/movie';
import { MovieService } from 'src/shared/services/movie.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.less']
})
export class SearchBarComponent implements OnInit, OnDestroy {

  readonly destroy$ = new Subject<void>();

  results$?: Observable<Movie[] | null>;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService
  ) { }

  form = this.fb.group({
    search: [null]
  });

  ngOnInit(): void {
    const search = this.form.get('search')!;

    this.results$ = search.valueChanges.pipe(
      debounceTime(200),
      switchMap(value => {
        if (!value) {
          return of(null);
        }
        return this.movieService.searchMovies(value).pipe(
          map(movies => movies.slice(0, 10))
        )
      }),
      takeUntil(this.destroy$)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  reset(): void {
    this.form.reset();
  }

}

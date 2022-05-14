import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, concat, forkJoin } from 'rxjs';
import { MoviesList } from 'src/shared/models';
import { ListsService } from 'src/shared/services';

@Component({
  selector: 'app-add-to-list',
  templateUrl: './add-to-list.component.html',
  styleUrls: ['./add-to-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToListComponent implements OnInit {
  @Input() movieId!: string;
  @Output() ready = new EventEmitter<void>();

  lists$ = new BehaviorSubject<MoviesList[] | undefined>(undefined);

  form = this.fb.group({});

  constructor(private fb: FormBuilder, private listsService: ListsService) { }

  ngOnInit(): void {
    this.listsService.getAllListsCurrent$().subscribe(
      lists => {
        this.lists$.next(lists);
        lists.forEach((_, i) =>
          this.form.addControl(String(i), this.fb.control(false)),
        );
      }
    );
  }

  get listSelected(): boolean {
    for (const key of Object.keys(this.form.controls)) {
      if (this.form.controls[key].value) {
        return true;
      }
    }

    return false;
  }

  add(): void {
    forkJoin(
      this.lists$.value!
        .filter((_, i) => this.form.controls[String(i)].value)
        .map(list => this.listsService.addMovieToList$(this.movieId, list.listId!))
    ).subscribe(
      () => this.ready.emit(),
      () => {}
    );
  }
}

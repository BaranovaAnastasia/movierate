import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/shared/models/user/user';
import { UserTopEntry } from 'src/shared/models/user/user-top-entry';
import { UserTopOption } from 'src/shared/models/user/user-top-option';
import { UserService } from 'src/shared/services/user/user.service';

@Component({
  selector: 'app-user-top',
  templateUrl: './user-top.component.html',
  styleUrls: ['./user-top.component.less']
})
export class UserTopComponent implements OnInit {
  @Input() top!: UserTopOption;
  users?: UserTopEntry[];
  positions: string[] = ['position gold', 'position silver', 'position bronze'];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserTop(this.top, 3).subscribe(
      result => this.users = result
    );
  }

  get topTitle() {
    switch(this.top) {
      case 'movies':
        return 'Watched the most movies';
      case 'minutes':
        return 'Spent the most time';
      case 'reviews':
        return 'Wrote the most reviews';
    }
  }

  getValue(user: UserTopEntry): string {
    switch(this.top) {
      case 'movies':
        return `${user.movies_count} movies`;
      case 'minutes':
        return `${Math.round(user.minutes_count / 60)} hours`;
      case 'reviews':
        return `${user.reviews_count} reviews`;
    }
  }

}

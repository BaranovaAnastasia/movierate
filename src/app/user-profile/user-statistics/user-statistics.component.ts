import { Component, Input, OnInit } from '@angular/core';
import { UserStats } from 'src/shared/models';
import { UserService } from 'src/shared/services';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.less']
})
export class UserStatisticsComponent implements OnInit {
  @Input() userId!: number;

  genresNames: string[] = [];
  genresCounts: number[] = [];

  stats?: UserStats;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserGenresStats(this.userId).subscribe(
      result => {
        this.genresNames = result.map(elem => elem.genre_name);
        this.genresCounts = result.map(elem => elem.movies_count);
      }
    );
    this.userService.getUserStats(this.userId).subscribe(
      result => this.stats = result
    );
  }

  getNextGoal(current: number): number {
    const steps = [0, 10, 50, 100, 500, 1000, 2000, 5000];
    const result = steps.reduce((prev, curr) => 
      (prev <= current) || (curr - current < prev - current) ? curr : prev
    );
    if (result === 0) {
      return Math.ceil(current / 5000) * 5000;
    }
    return result;
  }

}

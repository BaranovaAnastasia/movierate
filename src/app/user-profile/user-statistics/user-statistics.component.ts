import { Component, Input, OnInit } from '@angular/core';
import { UserStatistics } from 'src/shared/models/user-statistics';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.less']
})
export class UserStatisticsComponent {
  @Input() statistics!: UserStatistics;

  get genresNames(): string[] {
    return this.statistics.genres.map(item => item.genre);
  }

  get genresValues(): number[] {
    return this.statistics.genres.map(item => item.watched);
  }

  getNextGoal(current: number): number {
    const steps = [0, 10, 50, 100, 500, 1000, 2000, 5000];
    const result = steps.reduce((prev, curr) => 
      (prev <= current) || (curr - current < prev - current) ? curr : prev
    );
    console.log(result)
    if (result === 0) {
      return Math.ceil(current / 5000) * 5000;
    }
    return result;
  }

}

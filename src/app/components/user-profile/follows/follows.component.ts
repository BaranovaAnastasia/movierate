import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { User } from 'src/shared/models';

@Component({
  selector: 'app-follows',
  templateUrl: './follows.component.html',
  styleUrls: ['./follows.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FollowsComponent implements OnChanges {
  @Input() following!: User[];
  @Input() followers!: User[];

  activeItemIndex = -1;

  ngOnChanges(changes: SimpleChanges): void {
    this.activeItemIndex = -1;

    this.following = Array.isArray(changes.following?.currentValue)
      ? changes.following?.currentValue
      : this.following;

    this.followers = Array.isArray(changes.followers?.currentValue)
      ? changes.followers?.currentValue
      : this.followers;
  }

  get displayFollowing(): boolean {
    return (
      this.activeItemIndex === 0 && this.following && this.following.length > 0
    );
  }
  get displayFollowers(): boolean {
    return (
      this.activeItemIndex === 1 && this.followers && this.followers.length > 0
    );
  }

  cancelTabs(): void {
    this.activeItemIndex = -1;
  }
}

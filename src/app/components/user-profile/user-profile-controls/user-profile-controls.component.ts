import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from 'src/shared/models';
import { AuthService } from 'src/shared/services';
import { FOLLOW, UNFOLLOW } from '../constants';

@Component({
  selector: 'app-user-profile-controls',
  templateUrl: './user-profile-controls.component.html',
  styleUrls: ['./user-profile-controls.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileControlsComponent {
  @Input() user!: User;

  constructor(private authService: AuthService) {}

  get isFollowing(): boolean {
    return false;
  }

  get followText(): string {
    return this.isFollowing ? UNFOLLOW : FOLLOW;
  }

  logout() {
    this.authService.logout$().subscribe();
  }
}

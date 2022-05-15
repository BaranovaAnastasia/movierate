import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/shared/models';
import { AuthService, UserService } from 'src/shared/services';
import { FOLLOW, UNFOLLOW } from '../constants';

@Component({
  selector: 'app-user-profile-controls',
  templateUrl: './user-profile-controls.component.html',
  styleUrls: ['./user-profile-controls.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileControlsComponent {
  @Input() user!: User;
  @Output() follow = new EventEmitter<Observable<User[]>>();
  @Output() unfollow = new EventEmitter<Observable<User[]>>();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  get followText(): string {
    return this.user.isFollowed ? UNFOLLOW : FOLLOW;
  }

  logout() {
    this.authService.logout$().subscribe();
  }

  followClick(): void {
    if (this.user.isFollowed) {
      this.unfollowUser();
      return;
    }
    this.followUser();
  }

  private followUser(): void {
    this.unfollow.emit(
      this.userService.follow$(this.user.id).pipe(
        tap(() => {
          this.user.isFollowed = true;
          this.changeDetectorRef.detectChanges();
        }),
      ),
    );
  }
  private unfollowUser(): void {
    this.unfollow.emit(
      this.userService.unfollow$(this.user.id).pipe(
        tap(() => {
          this.user.isFollowed = false;
          this.changeDetectorRef.detectChanges();
        }),
      ),
    );
  }
}

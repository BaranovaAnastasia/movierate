import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/shared/models/user';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-user-preview',
  templateUrl: './user-preview.component.html',
  styleUrls: ['./user-preview.component.less']
})
export class UserPreviewComponent implements OnInit {
  @Input() userId!: string;
  user!: User;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUserById(this.userId).subscribe(
      user => {
        this.user = user;
      }
    );
}

}

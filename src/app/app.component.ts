import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'movierate';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.initialize();
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  str(smth: any) {
    return String(smth);
  }

}

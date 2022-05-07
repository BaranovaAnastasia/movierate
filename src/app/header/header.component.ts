import { Component } from '@angular/core';
import { AuthService } from 'src/shared/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {

  constructor(public authService: AuthService) { }

}

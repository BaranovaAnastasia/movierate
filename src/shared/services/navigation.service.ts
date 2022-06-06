import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  toProfile(userId: number) : void{
    this.router.navigate(['/user', userId])
  }

  toMain() : void{
    this.router.navigate([''])
  }

  toSignIn() : void{
    this.router.navigate(['/signin'])
  }
}

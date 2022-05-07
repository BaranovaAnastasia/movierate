import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/shared/services';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent {
  
  form = this.fb.group({
    email: [null, Validators.required, Validators.email],
    password: [null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  signin(): void {
    const {email, password} = this.form.getRawValue();
    this.authService.signin$(email, password);
  }
}

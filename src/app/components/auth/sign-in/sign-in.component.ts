import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/shared/services';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  form = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
  });

  signInErrorMsg?: string;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  signin(): void {
    const { email, password } = this.form.getRawValue();
    this.authService.signin$(email, password).subscribe(
      () => {
        this.form.controls.password.reset()
      },
      error => {
        this.form.controls.password.reset()
        this.signInErrorMsg = error.error.message ? error.error.message : 'An error occured :(';
      }
    );
  }

  focus(): void {
    this.signInErrorMsg = undefined;
  }
}

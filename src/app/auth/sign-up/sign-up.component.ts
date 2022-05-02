import { Component, OnInit } from '@angular/core';
import { FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent {

  form = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    name: [null, Validators.required],
    password: [null, [
      Validators.required,
      Validators.pattern(new RegExp(`^(?=.*[a-z])(?=.*[0-9]).{8}`))
    ]],
    confirmPassword: [null, [
      Validators.required,
      this.checkPasswords()
    ]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  signup() {
    const { email, name, password } = this.form.getRawValue();
    this.authService.signup$(email, name, password);
  }

  checkPasswords(): ValidatorFn {
    return (): ValidationErrors | null => {
      const data = this.form?.getRawValue();

      if(!data) return null;

      return data.password === data.confirmPassword ? null : { match: true }
    }
  }

}

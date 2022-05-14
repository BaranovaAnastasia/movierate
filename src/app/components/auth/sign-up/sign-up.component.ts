import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/shared/services';
import { DEFAULT_ERROR_MSG, EMAIL_FORMAT_MSG, EMAIL_REQUIRED_MSG, PASSWORD_FORMAT_MSG, PASSWORD_LENGTH_MSG, PASSWORD_REGEXP, PASSWORD_REQUIRED_MSG } from '../constants';

function isInvalid(control: AbstractControl): boolean {
  return control.invalid && control.touched;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  form = this.fb.group({
    name: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    password: [
      null,
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(new RegExp(PASSWORD_REGEXP)),
      ],
    ],
    confirmPassword: [null, [Validators.required, this.checkPasswords()]],
  });

  signUpErrorMsg?: string;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  get emailError(): string | undefined {
    const email = this.form.controls.email;

    if (email?.errors?.['required']) {
      return EMAIL_REQUIRED_MSG;
    }
    if (email?.errors?.['email']) {
      return EMAIL_FORMAT_MSG;
    }
    return undefined;
  }

  get passwordError(): string | undefined {
    const password = this.form.controls.password;

    if (password?.errors?.['required']) {
      return PASSWORD_REQUIRED_MSG;
    }
    if (password?.errors?.['minlength']) {
      return PASSWORD_LENGTH_MSG;
    }
    if (password?.errors?.['pattern']) {
      return PASSWORD_FORMAT_MSG;
    }
    return undefined;
  }

  getIsInvalid(controlName: string): boolean {
    return isInvalid(this.form.get(controlName)!);
  }

  checkPasswords(): ValidatorFn {
    return (): ValidationErrors | null => {
      const data = this.form?.getRawValue();

      if (!data) return null;

      return data.password === data.confirmPassword ? null : { match: true };
    };
  }

  signup() {
    const { email, name, password } = this.form.getRawValue();
    this.authService.signup$(email, name, password).subscribe(
      () => {
        this.form.controls.password.reset();
        this.form.controls.confirmPassword.reset();
      },
      error => {
        this.form.controls.password.reset();
        this.form.controls.confirmPassword.reset();
        this.signUpErrorMsg = error.error.message
          ? error.error.message
          : DEFAULT_ERROR_MSG;
      },
    );
  }
}

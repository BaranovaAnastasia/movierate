import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

type AuthorizationMode = 'log-in' | 'sign-up';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.less']
})
export class AuthorizationComponent implements OnInit {
  @Input() mode!: AuthorizationMode;

  constructor(
    private fb: FormBuilder,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedroute.params.subscribe(routeParams => {
      this.mode = routeParams.mode;
    });
  }

  get isSignUp(): boolean {
    return this.mode === "sign-up";
  }

  get formTitle(): string {
    return this.isSignUp ? "Create Account" : "Log In";
  }

  get submitText(): string {
    return this.isSignUp ? "Sign Up" : "Log In";
  }

  get alternativeText(): string {
    return this.isSignUp ? "Already have an account?" : "Don't have an account?";
  }

}

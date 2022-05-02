import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiModeModule, TuiTextfieldComponent, TuiTextfieldControllerModule } from '@taiga-ui/core';



@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiModeModule,
    TuiTextfieldControllerModule,
    TuiButtonModule
  ],
  exports: [
    SignInComponent,
    SignUpComponent
  ]
})
export class AuthModule { }

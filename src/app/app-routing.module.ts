import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { AuthGuard } from 'src/shared/guards';
import { MovieComponent } from './components/movie/movie.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  { path: 'signin', component: SignInComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignUpComponent, canActivate: [AuthGuard] },
  { path: 'movie/:id', component: MovieComponent },
  { path: 'user/:id', component: UserProfileComponent },
  { path: '', component: FrontPageComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      anchorScrolling: 'enabled',
      enableTracing: false,
    }),
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}

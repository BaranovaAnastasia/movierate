import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationComponent } from './authorization/authorization.component';
import { MovieComponent } from './movie/movie.component';

const routes: Routes = [
  { path: 'authorization/:mode', component: AuthorizationComponent },
  { path: 'authorization', component: AuthorizationComponent },
  { path: 'movie/:id', component: MovieComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

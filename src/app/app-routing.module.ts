import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationComponent } from './authorization/authorization.component';

const routes: Routes = [
  { path: 'authorization/:mode', component: AuthorizationComponent },
  { path: 'authorization', component: AuthorizationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

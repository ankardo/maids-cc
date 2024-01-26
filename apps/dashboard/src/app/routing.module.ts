import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAppComponent } from 'apps/user/src/app/app.component';
import { UserDetailComponent } from 'apps/user/src/app/user-detail/user-detail.component';


const routes: Routes = [
  { path: 'users', component: UserAppComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: '**', redirectTo:'/users' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule { }

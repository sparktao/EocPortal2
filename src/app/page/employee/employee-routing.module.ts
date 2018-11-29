import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { EmpListComponent } from './emp-list/emp-list.component';
import { RequireAuthenticatedUserRouteGuard } from '@shared/oidc/require-authenticated-user-route.guard';

const routes: Routes = [
  {
    path: '', component: EmployeeComponent,
    children: [
      {
        path: 'emp-list', component: EmpListComponent,
        canActivate: [RequireAuthenticatedUserRouteGuard]
      },
      // {
      //   path: 'edit-post/:id', component: EditPostComponent,
      //   canActivate: [RequireAuthenticatedUserRouteGuard]
      // },
      { path: '**', redirectTo: 'emp-list'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { EmpListComponent } from './emp-list/emp-list.component';
import { SharedModule } from '@shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationHeaderInterceptor } from '@shared/oidc/authorization-header-interceptor.interceptor';
import { CreateEmpComponent } from './create-emp/create-emp.component';
import { EditEmpComponent } from './edit-emp/edit-emp.component';


@NgModule({
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: [
    EmployeeComponent,
    EmpListComponent,
    CreateEmpComponent,
    EditEmpComponent
  ],
  entryComponents: [
    CreateEmpComponent,
    EditEmpComponent
  ],
  providers:[
        {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationHeaderInterceptor,
      multi: true
    }
  ]

})
export class EmployeeModule { }

import { NgModule, InjectionToken } from '@angular/core';
import { BaseUserService} from './service/base-user.service';
import { MenuService } from './service/menu.service';
import { HttpClientModule } from '@angular/common/http';
import { OrgEmployeeService } from './service/org-employee.service';

@NgModule({
  providers:[
    BaseUserService,
    MenuService,
    OrgEmployeeService
  ],
  imports: [
    HttpClientModule
  ],
  declarations: []
})
export class ServiceProxiesModule { }

import { NgModule, InjectionToken } from '@angular/core';
import { BaseUserService} from './service/base-user.service';
import { MenuService } from './service/menu.service';
import {CommonService} from './common.service';



@NgModule({
  providers:[
    BaseUserService,
    MenuService,
    CommonService
  ],
  imports: [],
  declarations: []
})
export class ServiceProxiesModule { }

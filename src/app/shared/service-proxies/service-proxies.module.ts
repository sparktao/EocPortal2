import { NgModule, InjectionToken } from '@angular/core';
import { BaseUserService} from './service/base-user.service';
import { MenuService } from './service/menu.service';

@NgModule({
  providers:[
    BaseUserService,
    MenuService
  ],
  imports: [],
  declarations: []
})
export class ServiceProxiesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { ServiceProxiesModule } from '@shared/service-proxies/service-proxies.module';
import { SidebarNavComponent } from './sidebar/sidebar-nav/sidebar-nav.component';

import { HeaderSearchComponent } from './header/components/search.component';
import { HeaderNotifyComponent } from './header/components/notify.component';
import { HeaderTaskComponent } from './header/components/task.component';
import { HeaderIconComponent } from './header/components/icon.component';
import { HeaderFullScreenComponent } from './header/components/fullscreen.component';
import { HeaderThemeComponent } from './header/components/theme.component';
import { HeaderI18nComponent } from './header/components/i18n.component';
import { HeaderStorageComponent } from './header/components/storage.component';
import { HeaderUserComponent } from './header/components/user.component';
import { NotifyService } from '@shared/notify/notify.service';
import { RouterModule } from '@angular/router';


const COMPONENTS = [
  LayoutComponent,
  HeaderComponent,
  SidebarNavComponent
];


const HEADERCOMPONENTS = [
  HeaderSearchComponent,
  HeaderNotifyComponent,
  HeaderTaskComponent,
  HeaderIconComponent,
  HeaderFullScreenComponent,
  HeaderThemeComponent,
  HeaderI18nComponent,
  HeaderStorageComponent,
  HeaderUserComponent
];


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ServiceProxiesModule
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    ...COMPONENTS,
    ...HEADERCOMPONENTS
  ],
  exports:[
    ...COMPONENTS
  ],
  providers:[ ServiceProxiesModule, NotifyService]
})
export class LayoutModule { }

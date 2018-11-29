import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, APP_INITIALIZER } from '@angular/core';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
// import zh from '@angular/common/locales/zh';
import localeZhHans from '@angular/common/locales/zh-Hans';
import localeZhHansExtra from '@angular/common/locales/extra/zh-Hans';
import { DelonComponentModule } from '@shared/components';
import { LayoutModule } from './layout/layout.module';
import { VoterComponent } from './voter.component';
import { VoteTakerComponent } from './votetaker.component';
import { SharedModule } from '@shared/shared.module';
import { AppPreBootstrap } from './AppPreBootstrap';
import { RouterModule, Routes } from '@angular/router';
import { SigninOidcComponent } from '@shared/oidc/signin-oidc/signin-oidc.component';
import { RedirectSilentRenewComponent } from '@shared/oidc/redirect-silent-renew/redirect-silent-renew.component';

export const ROUTES: Routes = [
  { path: 'employee', loadChildren: './page/employee/employee.module#EmployeeModule' },
  { path: 'signin-oidc', component: SigninOidcComponent },
  { path: 'redirect-silentrenew', component: RedirectSilentRenewComponent },
  { path: '**', redirectTo: 'employee' }
];

function fixedLocale(){
	localeZhHans[0] = 'zh-CN';
	registerLocaleData(localeZhHans, localeZhHansExtra);
}


export function appInitializerFactory(injector: Injector) {
	return () => {

		fixedLocale();

		return new Promise<boolean>((resolve, reject) => {
			AppPreBootstrap.run(injector, () => {
				// var appSessionService: AppSessionService = injector.get(AppSessionService);
				// appSessionService.init().then(
				// 	(result) => {
				// 		setNgZorroLocale(injector);
				// 		preloader();
				// 		resolve(result);
				// 	},
				// 	(err) => {
				// 		preloader();
				// 		reject(err);
				// 	}
      // 	);
      });

      resolve();
		});
	}
}


@NgModule({
  declarations: [
    AppComponent, VoterComponent, VoteTakerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    DelonComponentModule.forRoot(),
    RouterModule.forRoot(ROUTES),
    LayoutModule,
    SharedModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    {
			provide: APP_INITIALIZER,
			useFactory: appInitializerFactory,
			deps: [Injector],
			multi: true
		}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

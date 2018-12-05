import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import localeZhHans from '@angular/common/locales/zh-Hans';
import localeZhHansExtra from '@angular/common/locales/extra/zh-Hans';
import { DelonComponentModule } from '@shared/components';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from '@shared/shared.module';
import { AppPreBootstrap } from './AppPreBootstrap';
import { RouterModule, Routes } from '@angular/router';
import { SigninOidcComponent } from '@shared/oidc/signin-oidc/signin-oidc.component';
import { RedirectSilentRenewComponent } from '@shared/oidc/redirect-silent-renew/redirect-silent-renew.component';
import { AuthorizationHeaderInterceptor } from '@shared/oidc/authorization-header-interceptor.interceptor';
import { OpenIdConnectService } from '@shared/oidc/open-id-connect.service';
import { RequireAuthenticatedUserRouteGuard } from '@shared/oidc/require-authenticated-user-route.guard';

export const ROUTES: Routes = [
  { path: 'employee', loadChildren: './page/employee/employee.module#EmployeeModule' },
  ///oidc routers
  { path: 'signin-oidc', component: SigninOidcComponent },
  { path: 'redirect-silentrenew', component: RedirectSilentRenewComponent },
  { path: '**', redirectTo: 'employee' }
];

registerLocaleData(zh);

function fixedLocale(){
	localeZhHans[0] = 'zh-CN';
	registerLocaleData(localeZhHans, localeZhHansExtra);
}


export function appInitializerFactory(injector: Injector) {
	return () => {

		//fixedLocale();

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
    AppComponent,
    SigninOidcComponent,
    RedirectSilentRenewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    /** 导入 ng-zorro-antd 模块 **/
    NgZorroAntdModule,
    DelonComponentModule.forRoot(),
    RouterModule.forRoot(ROUTES),
    LayoutModule,
    SharedModule

  ],
  providers: [
    OpenIdConnectService,
    RequireAuthenticatedUserRouteGuard,
    /** 配置 ng-zorro-antd 国际化 **/
    { provide: NZ_I18N, useValue: zh_CN },
    // {
		// 	provide: APP_INITIALIZER,
		// 	useFactory: appInitializerFactory,
		// 	deps: [Injector],
		// 	multi: true
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthorizationHeaderInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Injector, Type, CompilerOptions, NgModuleRef } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environments/environment';


export class AppPreBootstrap {

    static run(injector: Injector, callback: () => void): void {
        AppPreBootstrap.getApplicationConfig(injector, () => {
            // AppPreBootstrap.getUserConfiguration(injector, callback);
        });
    }

    static bootstrap<TM>(moduleType: Type<TM>, compilerOptions?: CompilerOptions | CompilerOptions[]): Promise<NgModuleRef<TM>> {
        return platformBrowserDynamic().bootstrapModule(moduleType, compilerOptions);
    }

    private static getApplicationConfig(injector: Injector, callback: () => void) {
        let httpClient: HttpClient = injector.get(HttpClient);

        // let requestHeaders = {};
        // if(Abp.multiTenancy.getTenantIdCookie()){
        //     requestHeaders['Abp.TenantId'] = Abp.multiTenancy.getTenantIdCookie().toString();
        // }

        httpClient.get<any>('/assets/appconfig.json', {
            // headers: requestHeaders
        }).subscribe(result=>{


            callback();
        });

        // return abp.ajax({
        //     url: '/assets/appconfig.json',
        //     method: 'GET',
        //     headers: {
        //         'Abp.TenantId': abp.multiTenancy.getTenantIdCookie()
        //     }
        // }).done(result => {
        //     AppConsts.appBaseUrl = result.appBaseUrl;
        //     AppConsts.remoteServiceBaseUrl = result.remoteServiceBaseUrl;

        //     callback();
        // });
    }

    private static getUserConfiguration(injector: Injector, callback: () => void) {
        let httpClient: HttpClient = injector.get(HttpClient);

        // let requestHeaders = {
        //     Authorization: 'Bearer ' + Abp.auth.getToken()
        // };
        // if(Abp.multiTenancy.getTenantIdCookie()){
        //     requestHeaders['Abp.TenantId'] = Abp.multiTenancy.getTenantIdCookie().toString();
        // }
        // if(Abp.utils.getCookieValue("Abp.Localization.CultureName")){
        //     requestHeaders['.AspNetCore.Culture'] = Abp.utils.getCookieValue("Abp.Localization.CultureName");
        // }

        httpClient.get<any>(environment.apiUrlBase + '/UserConfiguration/GetAll', {
            // headers: requestHeaders
        }).subscribe(res=>{
            let result = res.result;
            // $.extend(true, Abp, result);
            console.log('UserConfiguration: %o', result);

            // Abp.multiTenancy.setGlobal(result.multiTenancy);
            // Abp.session.setGlobal(result.session);
            // Abp.localization.setGlobal(result.localization);
            // Abp.features.setGlobal(result.features);
            // Abp.auth.setGlobal(result.auth);
            // Abp.nav.setGlobal(result.nav);
            // Abp.setting.setGlobal(result.setting);

            // Abp.clock.setGloabl(result.clock);
            // Abp.timing.setGloabl(result.timing);

            callback();
        });

        // return abp.ajax({
        //     url: AppConsts.remoteServiceBaseUrl + '/AbpUserConfiguration/GetAll',
        //     method: 'GET',
        //     headers: {
        //         Authorization: 'Bearer ' + abp.auth.getToken(),
        //         '.AspNetCore.Culture': abp.utils.getCookieValue("Abp.Localization.CultureName"),
        //         'Abp.TenantId': abp.multiTenancy.getTenantIdCookie()
        //     }
        // }).done(result => {
        //     $.extend(true, abp, result);

        //     abp.clock.provider = this.getCurrentClockProvider(result.clock.provider);

        //     moment.locale(abp.localization.currentLanguage.name);

        //     if (abp.clock.provider.supportsMultipleTimezone) {
        //         moment.tz.setDefault(abp.timing.timeZoneInfo.iana.timeZoneId);
        //     }

        //     callback();
        // });
    }
}

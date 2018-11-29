import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppSessionService } from './session/app-session.service';
// import { AppUrlService } from './nav/app-url.service';
// import { AppAuthService } from './auth/app-auth.service';
// import { AppRouteGuard } from './auth/auth-route-guard';


// region: zorro modules
import {
    // LoggerModule,
    // NzLocaleModule,
    NzButtonModule,
    NzAlertModule,
    NzBadgeModule,
    // NzCalendarModule,
    NzCascaderModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzGridModule,
    NzMessageModule,
    NzModalModule,
    NzNotificationModule,
    NzPaginationModule,
    NzPopconfirmModule,
    NzPopoverModule,
    NzRadioModule,
    NzRateModule,
    NzSelectModule,
    NzSpinModule,
    NzSliderModule,
    NzSwitchModule,
    NzProgressModule,
    NzTableModule,
    NzTabsModule,
    NzTagModule,
    NzTimePickerModule,
    // NzUtilModule,
    NzStepsModule,
    NzDropDownModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzLayoutModule,
    // NzRootModule,
    NzCarouselModule,
    NzCardModule,
    NzCollapseModule,
    NzTimelineModule,
    NzToolTipModule,
    // NzBackTopModule,
    // NzAffixModule,
    // NzAnchorModule,
    NzAvatarModule,
    NzUploadModule,
    // SERVICES
    NzNotificationService,
    NzMessageService
} from 'ng-zorro-antd';
export const ZORROMODULES = [
    // LoggerModule,
    // NzLocaleModule,
    NzButtonModule,
    NzAlertModule,
    NzBadgeModule,
    // NzCalendarModule,
    NzCascaderModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzGridModule,
    NzMessageModule,
    NzModalModule,
    NzNotificationModule,
    NzPaginationModule,
    NzPopconfirmModule,
    NzPopoverModule,
    NzRadioModule,
    NzRateModule,
    NzSelectModule,
    NzSpinModule,
    NzSliderModule,
    NzSwitchModule,
    NzProgressModule,
    NzTableModule,
    NzTabsModule,
    NzTagModule,
    NzTimePickerModule,
    // NzUtilModule,
    NzStepsModule,
    NzDropDownModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzLayoutModule,
    // NzRootModule,
    NzCarouselModule,
    NzCardModule,
    NzCollapseModule,
    NzTimelineModule,
    NzToolTipModule,
    // NzBackTopModule,
    // NzAffixModule,
    // NzAnchorModule,
    NzAvatarModule,
    NzUploadModule
];
// endregion

// region: third libs
// import { CountdownModule } from 'ngx-countdown';
// import { UEditorModule } from 'ngx-ueditor';
// import { NzSchemaFormModule } from 'nz-schema-form';
const THIRDMODULES = [
    // CountdownModule,
    // UEditorModule,
    // NzSchemaFormModule
];
// endregion

import { DelonComponentModule } from './components';
import { NotifyService } from './notify/notify.service';;
import { SigninOidcComponent } from './oidc/signin-oidc/signin-oidc.component'
;
import { RedirectSilentRenewComponent } from './oidc/redirect-silent-renew/redirect-silent-renew.component'

// import { MomentDatePipe } from './pipes/moment-date.pipe';
// import { YNPipe } from './pipes/yn.pipe';
const PIPES = [
  // MomentDatePipe,
  // YNPipe
];

// import { ModalHelper } from './helpers/modal.helper';
// import { MenuService } from './service-proxies/service/menu.service';
// import { ColorsService } from './layout/colors.service'
const HELPERS = [
  // MenuService
  // ColorsService
];


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        ...ZORROMODULES,
        DelonComponentModule,
        ...THIRDMODULES
    ],
    declarations: [
        ...PIPES,
        SigninOidcComponent,
        RedirectSilentRenewComponent    ],
    providers: [
        // ModalHelper
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgZorroAntdModule,
        ...ZORROMODULES,
        DelonComponentModule,
        ...PIPES,
        ...THIRDMODULES
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                NzNotificationService,
                NzMessageService,

                AppSessionService,
                NotifyService
                // AppUrlService,
                // AppAuthService,
                // AppRouteGuard,
            ]
        }
    }
}

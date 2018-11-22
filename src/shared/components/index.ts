import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';

// region: all modules
// import { AdProHeaderModule } from './pro-header/pro-header.module';
import { AvatarListModule } from './avatar-list/avatar-list.module';
import { CountDownModule } from './count-down/count-down.module';
import { DatePickerModule} from './date-picker/date-picker.module'
// import { AdDescListModule } from './desc-list/desc-list.module';
import { EllipsisModule } from './ellipsis/ellipsis.module';
import { NoticeIconModule } from './notice-icon/notice-icon.module';
// import { AdNumberInfoModule } from './number-info/number-info.module';
import { NumberToChineseModule } from './number-to-chinese/number-to-chinese.module';
// import { AdResultModule } from './result/result.module';
// import { AdTagSelectModule } from './tag-select/tag-select.module';
// import { AdTrendModule } from './trend/trend.module';
// import { AdStandardFormRowModule } from './standard-form-row/standard-form-row.module';
// import { ReuseTabModule } from './reuse-tab/reuse-tab.module';

// import { AdChartsModule } from './charts/charts.module';

// const MODULES = [
//     AdProHeaderModule, AdAvatarListModule, AdCountDownModule, AdDescListModule, AdEllipsisModule, AdNoticeIconModule, AdNumberInfoModule, AdNumberToChineseModule,
//     AdResultModule, AdTagSelectModule, AdTrendModule, AdStandardFormRowModule,
//     AdReuseTabModule,
//     AdChartsModule
// ];

const MODULES = [
  AvatarListModule, CountDownModule, DatePickerModule, EllipsisModule,
  NoticeIconModule, NumberToChineseModule
];

// region: export

export * from './avatar-list';
export * from './count-down';
export * from './date-picker';
// export * from './desc-list';
export * from './ellipsis';
export * from './notice-icon';
// export * from './number-info';
// export * from './pro-header';
// export * from './result';
// export * from './standard-form-row';
// export * from './tag-select';
// export * from './trend';
// export * from './charts';
// export * from './reuse-tab';
export * from './number-to-chinese';

// endregion

@NgModule({
    imports: [
        //AdProHeaderModule.forRoot(),
        AvatarListModule.forRoot(),
        CountDownModule.forRoot(),
        DatePickerModule.forRoot(),
        // AdDescListModule.forRoot(),
        EllipsisModule.forRoot(),
        NoticeIconModule.forRoot(),
        // AdNumberInfoModule.forRoot(),
        NumberToChineseModule.forRoot(),
        // AdResultModule.forRoot(),
        // AdTagSelectModule.forRoot(),
        // AdTrendModule.forRoot(),
        // AdStandardFormRowModule.forRoot(),
        // ReuseTabModule.forRoot(),

        // AdChartsModule.forRoot()
    ],
    exports: MODULES
})
export class DelonRootModule {
    constructor(@Optional() @SkipSelf() parentModule: DelonRootModule) {
        if (parentModule) {
            throw new Error(`DelonRootModule has already been loaded. Import Core modules in the AppModule only.`);
        }
    }
}

@NgModule({ exports: MODULES })
export class DelonComponentModule {
    // constructor(@Optional() @SkipSelf() parentModule: DelonRootModule) {
    //     if (parentModule) {
    //         throw new Error(`DelonRootModule has already been loaded. Import Core modules in the AppModule only.`);
    //     }
    // }
    public static forRoot(): ModuleWithProviders {
        return { ngModule: DelonRootModule };
    }
}

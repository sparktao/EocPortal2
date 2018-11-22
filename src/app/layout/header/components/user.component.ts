import { Component, OnInit, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/component-base';
// import { AppAuthService } from '@shared/auth/app-auth.service';

@Component({
    selector: 'header-user',
    template: `
    <nz-dropdown nzPlacement="bottomRight">
        <div class="item d-flex align-items-center px-sm" nz-dropdown>
            <nz-avatar [nzSrc]="'/assets/images/user.png'" nzSize="small" class="mr-sm"></nz-avatar>
            {{shownLoginName}}
        </div>
        <ul nz-menu class="width-sm">
            <li nz-menu-item [nzDisabled]="true"><i class="anticon anticon-user mr-sm"></i>个人中心</li>
            <li nz-menu-item [nzDisabled]="true"><i class="anticon anticon-setting mr-sm"></i>设置</li>
            <li nz-menu-divider></li>
            <li nz-menu-item (click)="logout()"><i class="anticon anticon-setting mr-sm"></i>{{('Logout')}}</li>
        </ul>
    </nz-dropdown>
    `
})
export class HeaderUserComponent extends AppComponentBase implements OnInit {

    shownLoginName: string = "";

    constructor(
        injector: Injector
        // private _authService: AppAuthService
    ) {
        super(injector);
    }

    ngOnInit() {
        // this.shownLoginName = this.appSession.getShownLoginName();
    }

    logout(): void {
        // this._authService.logout();
    }
}

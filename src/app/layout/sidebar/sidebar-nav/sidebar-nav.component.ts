import { Component, OnInit, Injector } from "@angular/core";
import { AppComponentBase } from "@shared/component-base";
import {
  MenuItem,
  MenuService
} from "@shared/service-proxies/service/menu.service";

@Component({
  selector: "sidebar-nav",
  templateUrl: "./sidebar-nav.component.html",
  styleUrls: ["./sidebar-nav.component.css"]
})
export class SidebarNavComponent extends AppComponentBase implements OnInit {
  //菜单是通过MenuService中获取，设置菜单的位置在src/app/app.component.ts中。之所以这么干是因为在其他组件中需要获得菜单信息，因此将菜单数据放到服务中，以便共享给其他组件使用
  menuItems: MenuItem[];
  isCollapsed: boolean = false;
  themeValue: string = "light";

  constructor(injector: Injector, private menuService: MenuService) {
    super(injector);
    // this.menuItems = this.menuService.menus;
  }

  ngOnInit() {
    this.menuService.getAll().subscribe((result:MenuItem[]) => {
      this.menuItems = result;
    });
  }

  showMenuItem(menuItem): boolean {
    if (menuItem.permissionName) {

        // return this.permission.isGranted(menuItem.permissionName);
    }

    return true;
}
}

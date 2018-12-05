import { Injectable, Inject, Optional, OnDestroy } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export class MenuItem {
  id: string = '';
  name: string = '';
  // permissionName: string = '';
  icon: string = '';
  route: string = '';
  items: MenuItem[];

  constructor()
  {}

  // constructor(name: string, permissionName: string, icon: string, route: string, childItems: MenuItem[] = null) {
  //     this.name = name;
  //     this.permissionName = permissionName;
  //     this.icon = icon;
  //     this.route = route;
  //     this.items = childItems;
  // }

  init(data?: any) {
    if (data) {
      if(data["location"] != undefined || data["location"] != null) {
        this.id = data["id"];
        this.name = data["fullName"];
        this.icon = data["icon"];
        this.route = data["location"];
      }
    }
  }

  static fromJS(data: any): MenuItem {
    data = typeof data === 'object' ? data : {};
    let result = new MenuItem();
    result.init(data);
    return result;
}
}

@Injectable()
export class MenuService extends BaseService implements OnDestroy {
    protected jsonParseReviver: (key: string, value: any) => any = undefined;
    private data: MenuItem[] = [];

    constructor(@Inject(HttpClient) private httpClient: HttpClient) {
      super();
    }

    set menus(items: MenuItem[]) {
        this.data = items;
    }

    get menus() {
        return this.data;
    }

    getAll() {
      let url_ = this.appUrlBase + '/basemodule?';

      return this.httpClient.get(url_, {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
            "Accept": "application/json"
        }),
        observe: 'response'
      });
  }

    /**
     * 清空菜单
     */
    clear() {
        this.data = [];
    }

    /**
     * 根据URL设置菜单 `_open` 属性
     * @param url URL地址
     */
    openedByUrl(url: string) {
        if (!url) return;


    }

    /**
     * 根据url获取菜单列表
     * @param url
     */
    getPathByUrl(url: string): MenuItem[] {
        let result: MenuItem[] = [];
        this.findMenuItem(url, this.data, result)

        result.reverse();

        return result;
    }

    private findMenuItem(url: string, items: MenuItem[], result: MenuItem[]): boolean {
        let item: MenuItem;
        for (var i = 0; i < items.length; i++) {
            item = items[i];
            if(item.items && item.items.length)
            {
                if(this.findMenuItem(url, item.items, result))
                {
                    result.push(item);
                    return true;
                }
            }
            if(item.route == url || (!(item.items && item.items.length) && url.startsWith(item.route)))
            {
                result.push(item);
                return true;
            }
        }
    }

    ngOnDestroy(): void {

    }
}

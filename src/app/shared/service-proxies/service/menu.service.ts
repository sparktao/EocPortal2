import { Injectable, Inject, Optional, OnDestroy } from '@angular/core';
import { Http, Headers, ResponseContentType, Response } from '@angular/http';
import { BaseService } from '../base.service';
import { Observable, of } from 'rxjs';
import {flatMap, catchError} from 'rxjs/operators';


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
    private http: Http;
    protected jsonParseReviver: (key: string, value: any) => any = undefined;
    private data: MenuItem[] = [];

    constructor(@Inject(Http) http: Http) {
      super();
      this.http = http;
    }

    set menus(items: MenuItem[]) {
        this.data = items;
    }

    get menus() {
        return this.data;
    }

    getAll(): Observable<MenuItem[]> {
      let url_ = this.appUrlBase + '/basemodule?';

      let options_ : any = {
          method: "get",
          headers: new Headers({
              "Content-Type": "application/json",
              "Accept": "application/json"
          })
      };

      return this.http.request(url_, options_).pipe(
        flatMap((response_ : any) => {
          return this.processGetAll(response_);
        }),
        catchError((response_: any) => {
          if (response_ instanceof Response) {
              try {
                  return this.processGetAll(<any>response_);
              } catch (e) {
                  return <Observable<MenuItem>><any>Observable.throw(e);
              }
          } else
              return <Observable<MenuItem>><any>Observable.throw(response_);
        })
      );
  }

  protected processGetAll(response: Response): Observable<MenuItem[]> {
    const status = response.status;

    let _headers: any = response.headers ? response.headers.toJSON() : {};
    if (status === 200) {
        const _responseText = response.text();
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        if (resultData200 && resultData200.constructor === Array) {
            result200 = [];
            for (let item of resultData200)
                result200.push(MenuItem.fromJS(item));
        }
        return of(result200);
    } else if (status !== 200 && status !== 204) {
        const _responseText = response.text();
        //return throwException("An unexpected server error occurred.", status, _responseText, _headers);
    }
    return of<MenuItem[]>(<any>null);
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

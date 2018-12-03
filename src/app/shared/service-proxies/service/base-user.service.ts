import { Injectable, Inject, Optional } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import {flatMap, catchError} from 'rxjs/operators';
import { BaseService } from '../base.service';


export interface IBaseUser {
  userName: string;
  name: string;
  surname: string;
  emailAddress: string;
  isActive: boolean;
  fullName: string;
  lastLoginTime: moment.Moment;
  creationTime: moment.Moment;
  roleNames: string[];
  id: number;
}

export class BaseUser implements IBaseUser {
  userName: string;
  name: string;
  surname: string;
  emailAddress: string;
  isActive: boolean;
  fullName: string;
  lastLoginTime: moment.Moment;
  creationTime: moment.Moment;
  roleNames: string[];
  id: number;

  constructor(data?: IBaseUser) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(data?: any) {
      if (data) {
          this.userName = data["userName"];
          this.name = data["name"];
          this.surname = data["surname"];
          this.emailAddress = data["emailAddress"];
          this.isActive = data["isActive"];
          this.fullName = data["fullName"];
          this.lastLoginTime = data["lastLoginTime"] ? moment(data["lastLoginTime"].toString()) : <any>undefined;
          this.creationTime = data["creationTime"] ? moment(data["creationTime"].toString()) : <any>undefined;
          if (data["roleNames"] && data["roleNames"].constructor === Array) {
              this.roleNames = [];
              for (let item of data["roleNames"])
                  this.roleNames.push(item);
          }
          this.id = data["id"];
      }
  }

  static fromJS(data: any): BaseUser {
      data = typeof data === 'object' ? data : {};
      let result = new BaseUser();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["userName"] = this.userName;
      data["name"] = this.name;
      data["surname"] = this.surname;
      data["emailAddress"] = this.emailAddress;
      data["isActive"] = this.isActive;
      data["fullName"] = this.fullName;
      data["lastLoginTime"] = this.lastLoginTime ? this.lastLoginTime.toISOString() : <any>undefined;
      data["creationTime"] = this.creationTime ? this.creationTime.toISOString() : <any>undefined;
      if (this.roleNames && this.roleNames.constructor === Array) {
          data["roleNames"] = [];
          for (let item of this.roleNames)
              data["roleNames"].push(item);
      }
      data["id"] = this.id;
      return data;
  }

  clone() {
      const json = this.toJSON();
      let result = new BaseUser();
      result.init(json);
      return result;
  }
}

@Injectable()
export class BaseUserService extends BaseService{

  private http: Http;
    protected jsonParseReviver: (key: string, value: any) => any = undefined;

    constructor(@Inject(Http) http: Http) {
      super();
      this.http = http;
    }

    get(id:string): Observable<BaseUser> {
        let url_ = this.appUrlBase + '/api/User/Get?';
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined and cannot be null.");
        else
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
          method: "get",
          headers: new Headers({
              "Content-Type": "application/json",
              "Accept": "application/json"
          })
      };

      return this.http.request(url_, options_).pipe(
        flatMap((response_ : any) => {
          return this.processGet(response_);
        }),
        catchError((response_: any) => {
          if (response_ instanceof Response) {
              try {
                  return this.processGet(<any>response_);
              } catch (e) {
                  return <Observable<BaseUser>><any>Observable.throw(e);
              }
          } else
              return <Observable<BaseUser>><any>Observable.throw(response_);
        })
      );
    }

    protected processGet(response: Response): Observable<BaseUser> {
      const status = response.status;

      let _headers: any = response.headers ? response.headers.toJSON() : {};
      if (status === 200) {
          const _responseText = response.text();
          let result200: any = null;
          let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 ? BaseUser.fromJS(resultData200) : new BaseUser();
          return of(result200);
      } else if (status === 401) {
          const _responseText = response.text();
          return this.throwException("A server error occurred.", status, _responseText, _headers);
      } else if (status === 403) {
          const _responseText = response.text();
          return this.throwException("A server error occurred.", status, _responseText, _headers);
      } else if (status !== 200 && status !== 204) {
          const _responseText = response.text();
          return this.throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }
      return of<BaseUser>(<any>null);
  }
}

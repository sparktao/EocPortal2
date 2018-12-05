import { Injectable, Inject, Optional } from '@angular/core';
import * as moment from 'moment';
import { BaseService } from '../base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


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

    protected jsonParseReviver: (key: string, value: any) => any = undefined;

    constructor(@Inject(HttpClient) private httpClient: HttpClient) {
      super();
    }

    get(id:string) {
        let url_ = this.appUrlBase + '/User/Get?';
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

      return this.httpClient.get(url_, {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
            "Accept": "application/json"
        }),
        observe: 'response'
      });
    }
}

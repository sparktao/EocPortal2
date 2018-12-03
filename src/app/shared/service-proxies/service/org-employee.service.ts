import { Injectable, Inject } from '@angular/core';
import { BaseService } from '../base.service';
import * as moment from 'moment';
import { Http, Headers, Response } from '@angular/http';
import { Observable, of } from 'rxjs';
import { flatMap, catchError } from 'rxjs/operators';


export class OrgEmployee{
  // 联系人编号
  employee_Id:number;
  /// 联系人姓名
  employee_Name:string;
  /// 性别
  gender:string;
  /// 出生日期
  birthday:moment.Moment;
  /// 证件类型
  certificate_Type:string;
  /// 证件代码
  certificate_Code:string;
  /// 联系电话
  contact_Phone:string;
  /// 办公电话1
  office_Telephone1:string;
  /// 办公电话2
  office_Telephone2:string;
  /// 办公传真
  office_Fax:string;
  /// 电子邮件
  email:string;
  /// 家庭电话
  home_Telephone:string;
  /// 家庭地址
  home_Address:string;
  /// 职务描述
  duty_Desc:string;
  /// 单位ID
  organizationn_Id:string;
  /// 办公室房间号
  room_Num:string;
  /// 司机电话
  driver_Phone:string;
  /// 备注
  note:string;
  /// 秘书电话
  secretary_Phone:string;
  /// 有效标志
  isvalid:number;
  /// 创建时间
  created_Date: moment.Moment;
  modified_Date: moment.Moment;
  headIcon:string;

  init(data?: any) {
    if (data) {
        this.employee_Id = data["employee_Id"];
        this.employee_Name = data["employee_Name"];
        this.gender = data["gender"];
        this.birthday = data["birthday"] ? moment(data["birthday"].toString()) : <any>undefined;
        this.certificate_Type = data["certificate_Type"];
        this.certificate_Code = data["certificate_Code"];
        this.contact_Phone = data["contact_Phone"];
        this.office_Telephone1 = data["office_Telephone1"];
        this.office_Telephone2 = data["office_Telephone2"];
        this.office_Fax = data["office_Fax"];
        this.email = data["email"];
        this.home_Telephone = data["home_Telephone"];
        this.home_Address = data["home_Address"];
        this.duty_Desc = data["duty_Desc"];
        this.organizationn_Id = data["organizationn_Id"];
        this.room_Num = data["room_Num"];
        this.driver_Phone = data["driver_Phone"];
        this.note = data["note"];
        this.secretary_Phone = data["secretary_Phone"];
        this.isvalid = data["isvalid"];
        this.created_Date = data["created_Date"] ? moment(data["created_Date"].toString()) : <any>undefined;
        this.modified_Date = data["modified_Date"] ? moment(data["modified_Date"].toString()) : <any>undefined;
        this.headIcon = data["headIcon"];
    }
}

  static fromJS(data: any): OrgEmployee {
      data = typeof data === 'object' ? data : {};
      let result = new OrgEmployee();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["employee_Id"] = this.employee_Id;
      data["employee_Name"] = this.employee_Name;
      data["gender"] = this.gender;
      data["birthday"] = this.birthday ? this.birthday.toISOString() : <any>undefined;
      data["certificate_Type"] = this.certificate_Type;
      data["certificate_Code"] = this.certificate_Code;
      data["contact_Phone"] = this.contact_Phone;
      data["office_Telephone1"] = this.office_Telephone1;
      data["office_Telephone2"] = this.office_Telephone2;
      data["office_Fax"] = this.office_Fax;
      data["email"] = this.email;
      data["home_Telephone"] = this.home_Telephone;
      data["home_Address"] = this.home_Address;
      data["duty_Desc"] = this.duty_Desc;
      data["organizationn_Id"] = this.organizationn_Id;
      data["room_Num"] = this.room_Num;
      data["driver_Phone"] = this.driver_Phone;
      data["note"] = this.note;
      data["secretary_Phone"] = this.secretary_Phone;
      data["isvalid"] = this.isvalid;
      data["created_Date"] = this.created_Date ? this.created_Date.toISOString() : <any>undefined;
      data["modified_Date"] = this.modified_Date ? this.modified_Date.toISOString() : <any>undefined;
      data["headIcon"] = this.headIcon;

      return data;
  }

  clone() {
      const json = this.toJSON();
      let result = new OrgEmployee();
      result.init(json);
      return result;
  }
}

export class PagedResultDtoOfOrgEmployee  {
  totalCount: number;
  items: OrgEmployee[];

  constructor() {
  }

  init(data?: any) {
      if (data) {
          this.totalCount = data["totalCount"];
          if (data["items"] && data["items"].constructor === Array) {
              this.items = [];
              for (let item of data["items"])
                  this.items.push(OrgEmployee.fromJS(item));
          }
      }
  }

  static fromJS(data: any): PagedResultDtoOfOrgEmployee {
      data = typeof data === 'object' ? data : {};
      let result = new PagedResultDtoOfOrgEmployee();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["totalCount"] = this.totalCount;
      if (this.items && this.items.constructor === Array) {
          data["items"] = [];
          for (let item of this.items)
              data["items"].push(item.toJSON());
      }
      return data;
  }

  clone() {
      const json = this.toJSON();
      let result = new PagedResultDtoOfOrgEmployee();
      result.init(json);
      return result;
  }
}


@Injectable({
  providedIn: 'root'
})
export class OrgEmployeeService extends BaseService {
  protected http:Http;
  protected jsonParseReviver: (key: string, value: any) => any = undefined;

  constructor(@Inject(Http) http: Http) {
    super();
    this.http = http;
  }

  getAll(skipCount: number, maxResultCount: number): Observable<PagedResultDtoOfOrgEmployee> {
    let url_ = this.appUrlBase + "/employee?";
    if (skipCount === undefined || skipCount === null)
        throw new Error("The parameter 'skipCount' must be defined and cannot be null.");
    else
        url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === undefined || maxResultCount === null)
        throw new Error("The parameter 'maxResultCount' must be defined and cannot be null.");
    else
        url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
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
        return this.processGetAll(response_);
      }),
      catchError((response_: any) => {
        if (response_ instanceof Response) {
            try {
                return this.processGetAll(<any>response_);
            } catch (e) {
                return <Observable<PagedResultDtoOfOrgEmployee>><any>Observable.throw(e);
            }
        } else
            return <Observable<PagedResultDtoOfOrgEmployee>><any>Observable.throw(response_);
    }));
}

protected processGetAll(response: Response): Observable<PagedResultDtoOfOrgEmployee> {
    const status = response.status;

    let _headers: any = response.headers ? response.headers.toJSON() : {};
    if (status === 200) {
        const _responseText = response.text();
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 ? PagedResultDtoOfOrgEmployee.fromJS(resultData200) : new PagedResultDtoOfOrgEmployee();
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
    return of<PagedResultDtoOfOrgEmployee>(<any>null);
}


}

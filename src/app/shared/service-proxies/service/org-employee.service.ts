import { Injectable, Inject } from '@angular/core';
import { BaseService } from '../base.service';
import * as moment from 'moment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PaginationParameters } from '@shared/component-base/paged-listing-component-base';

export class CreateOrgEmployeeDTO {
   /// 联系人姓名
   employee_Name:string;
   /// 性别
  gender:string;
  /// 出生日期
  birthday:Date;
  /// 联系电话
  contact_Phone:string;
  /// 电子邮件
  email:string;
  /// 有效标志
  isvalid:boolean;
}

export class OrgEmployee{
  // 联系人编号
  employee_Id:number;
  /// 联系人姓名
  employee_Name:string;
  /// 性别
  gender:string;
  /// 出生日期
  birthday:Date;
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
  created_Date: Date;
  modified_Date: Date;
  headIcon:string;

  init(data?: any) {
    if (data) {
        this.employee_Id = data["employee_Id"];
        this.employee_Name = data["employee_Name"];
        this.gender = data["gender"];
        this.birthday = data["birthday"] ? new Date(data["birthday"].toString()) : <any>undefined;
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
        this.created_Date = data["created_Date"] ? new Date(data["created_Date"].toString()) : <any>undefined;
        this.modified_Date = data["modified_Date"] ? new Date(data["modified_Date"].toString()) : <any>undefined;
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
          if (data && data.constructor === Array) {
              this.items = [];
              for (let item of data)
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
  protected jsonParseReviver: (key: string, value: any) => any = undefined;

  constructor(@Inject(HttpClient) private httpClient: HttpClient) {
    super();
  }

  /**
   * 查询
   * @param skipCount
   * @param maxResultCount
   */
  getAll(paginationParameter?:any | PaginationParameters) {
    let url_ = this.appUrlBase + "/employee?";

    return this.httpClient.get(url_, {
      headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Accept": "application/json"
      }),
      observe: 'response',
      params: paginationParameter
    });
  }

  get(id: number) {
    let url_ = `${this.appUrlBase}/employee/`;
    if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined and cannot be null.");
    else
        url_ += encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_ : any = {
        method: "get",
        headers: new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json"
        })
    };

    return this.httpClient.get(url_, options_);
}

  /**
     * @input (optional)
     * @return Success
     */
    create(employee: CreateOrgEmployeeDTO) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        })
      };

      return this.httpClient.post(`${this.appUrlBase}/employee`, employee, httpOptions);
  }

  /**
     * @input (optional)
     * @return Success
     */
    update(employee:OrgEmployee) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        })
      };

      return this.httpClient.put(`${this.appUrlBase}/employee`, employee, httpOptions);
  }

  delete(id:number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    return this.httpClient.delete(`${this.appUrlBase}/employee/`+ id, httpOptions);
  }

}

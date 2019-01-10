import { Component, OnInit, Injector } from '@angular/core';
import { PagedListingComponentBase } from '@shared/component-base';
import { OrgEmployee, OrgEmployeeService, PagedResultDtoOfOrgEmployee } from '@shared/service-proxies/service/org-employee.service';
import { ModalHelper } from '@shared/helpers/modal.helper';
import { finalize } from 'rxjs/operators';
import { CreateEmpComponent } from '../create-emp/create-emp.component';
import { PaginationParameters, PageMeta } from '@shared/component-base/paged-listing-component-base';
import { EditEmpComponent } from '../edit-emp/edit-emp.component';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styles: []
})
export class EmpListComponent extends PagedListingComponentBase<OrgEmployee> {

  loading = false;
  dataItems: OrgEmployee[] = [];
  pagination = new PaginationParameters({ sidx: 'created_date', sord:'desc', pageSize: this.pageSize, pageIndex: this.pageIndex });
  pageMeta: PageMeta = new PageMeta();

  constructor(private injector: Injector,
		private employeeService: OrgEmployeeService,
		private modalHelper: ModalHelper) {
      super(injector);
    }

    list(finishedCallback: Function): void {
      this.loading = true;

      this.pagination.pageIndex = this.pageIndex;
      this.pagination.pageSize = this.pageSize;
      this.employeeService.getAll(this.pagination)
        .pipe(
          finalize(() => {
            finishedCallback();
            this.loading = false;
          }))
        .subscribe(
          resp=>{
            const status = resp.status;
            if (status === 200) {
                let result200 :any = null;
                try{
                  result200 = PagedResultDtoOfOrgEmployee.fromJS(resp.body);
                } catch(ex){
                  result200 = new PagedResultDtoOfOrgEmployee();
                }
                this.pageMeta.init(JSON.parse(resp.headers.get('X-Pagination')));
                this.dataItems = result200.items;
                this.showPaging(this.pageMeta.pageCount, this.pageMeta.totalItemsCount);
            }
          },
          err=>{
            console.log(err.message);
      });
    }

    delete(entity: OrgEmployee): void {
      throw new Error("Method not implemented.");
    }

    create(): void {
      this.modalHelper.open(CreateEmpComponent).afterClose.subscribe(res => this.refresh());
    }

    edit(employee: OrgEmployee): void {
      this.modalHelper.open(EditEmpComponent, {id: employee.employee_Id})
          .afterClose.subscribe(res => this.refresh());
    }

}

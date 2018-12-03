import { Component, OnInit, Injector } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base';
import { OrgEmployee, OrgEmployeeService, PagedResultDtoOfOrgEmployee } from '@shared/service-proxies/service/org-employee.service';
import { ModalHelper } from '@shared/helpers/modal.helper';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styles: []
})
export class EmpListComponent extends PagedListingComponentBase<OrgEmployee> {

  loading = false;
	dataItems: OrgEmployee[] = [];

  constructor(private injector: Injector,
		private employeeService: OrgEmployeeService,
		private modalHelper: ModalHelper) {
      super(injector);
    }

    list(request:PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
      this.loading = true;

      this.employeeService.getAll(request.skipCount, request.maxResultCount)
        .pipe(
          finalize(() => {
            finishedCallback();
            this.loading = false;
          }))
        .subscribe((result: PagedResultDtoOfOrgEmployee) => {
          this.dataItems = result.items;
          this.showPaging(result, pageNumber);
        });
    }

    delete(entity: OrgEmployee): void {
      throw new Error("Method not implemented.");
    }

    create(): void {
      throw new Error("Method not implemented.");
    }

    edit(user: OrgEmployee): void {
      throw new Error("Method not implemented.");
    }

}

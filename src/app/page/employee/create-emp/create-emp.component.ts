import { Component, OnInit, Injector } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { OrgEmployeeService, CreateOrgEmployeeDTO } from '@shared/service-proxies/service/org-employee.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-emp',
  templateUrl: './create-emp.component.html',
  styles: []
})
export class CreateEmpComponent extends ModalComponentBase implements OnInit {
  saving: boolean = false;
  employee: CreateOrgEmployeeDTO;
  validateForm: FormGroup;

  constructor(
    private injector: Injector,
    private employeeService: OrgEmployeeService,
    private formBuilder: FormBuilder) {
      super(injector);
    }

  ngOnInit() {


    this.validateForm = this.formBuilder.group({
      employeename: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(32)])],
			contactphone: [null, Validators.compose([Validators.required])],
      email: ['', [Validators.email, Validators.required]],
      birthday: [],
      gender: [ null, [ Validators.required ] ],
      isactive: [true]
    });

    this.employee = new CreateOrgEmployeeDTO();
    this.employee.isvalid = true;

  }


  resetForm($event?: MouseEvent) {
    if($event) $event.preventDefault();

		this.validateForm.reset();
		for (const key in this.validateForm.controls) {
			this.validateForm.controls[key].markAsPristine();
		}
	}

	save(e): void {
    this.saving = true;
		this.employeeService.create(this.employee).subscribe(() => {
        this.notify.success(this.l('SavedSuccessfully'));
        this.saving = false;
        this.success();
			});
	}

}

import { Component, OnInit, Injector, Input } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { OrgEmployeeService, CreateOrgEmployeeDTO, OrgEmployee } from '@shared/service-proxies/service/org-employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styles: []
})
export class EditEmpComponent extends ModalComponentBase implements OnInit {

  @Input() id: number;

  saving: boolean = false;
  employee: OrgEmployee = new OrgEmployee();
  validateForm: FormGroup;

  constructor(
    private injector: Injector,
    private employeeService: OrgEmployeeService,
    private formBuilder: FormBuilder) {
      super(injector);
    }

  ngOnInit() {

    this.saving = true;

    this.employeeService.get(this.id).subscribe(result => {
      this.employee = new OrgEmployee();
      this.employee.init(result);
      this.saving = false;
    });

    this.validateForm = this.formBuilder.group({
      employeename: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(32)])],
			contactphone: [null, Validators.compose([Validators.required])],
      email: ['', [Validators.email, Validators.required]],
      birthday: [],
      gender: [ null, [ Validators.required ] ],
      isactive: [true]
    });

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
		this.employeeService.update(this.employee)
			.subscribe(() => {
				this.notify.success(this.l('SavedSuccessfully'));
        this.success();
        this.saving = false;
			});
	}

}

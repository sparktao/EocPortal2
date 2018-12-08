import { Injector } from '@angular/core';
import { AppComponentBase } from './app-component-base';
import { NzModalRef } from 'ng-zorro-antd';

export abstract class ModalComponentBase extends AppComponentBase {
	modalVisible: boolean = false;
	modalRef: NzModalRef;

	constructor(injector: Injector) {
		super(injector);
    this.modalRef = injector.get(NzModalRef);

	}

	success(result?: any){
		this.modalVisible = false;
		this.modalRef.destroy(result);
	}

	close($event?: MouseEvent): void {
		if($event) $event.preventDefault();

		this.modalVisible = false;
		this.modalRef.destroy('onCancel');
	}

}

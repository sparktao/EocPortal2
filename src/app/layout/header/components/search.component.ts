import { Component, HostBinding, ViewChild, Input, OnInit, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    selector: 'header-search',
    template: `
    <nz-input-group [nzAddOnBefore]="prefix">
      <input nz-input placeholder='{{ "top-search-ph"}}' [(ngModel)]="q"
          (nzFocus)="qFocus()" (nzBlur)="qBlur()">
    </nz-input-group>
    <ng-template #prefix>
        <i class="anticon anticon-search"></i>
    </ng-template>
    `
})
export class HeaderSearchComponent implements AfterViewInit {

    q: string;

    qIpt: HTMLInputElement;

    @HostBinding('class.header-search__focus')
    focus = false;

    @HostBinding('class.header-search__toggled')
    searchToggled = false;

    @Input()
    set toggleChange(value: boolean) {
        if (typeof value === 'undefined') return;
        console.log('toggleChange', value);
        this.searchToggled = true;
        this.focus = true;
        setTimeout(() => this.qIpt.focus(), 300);
    }

    constructor(private el: ElementRef) {}

    ngAfterViewInit() {
        this.qIpt = (this.el.nativeElement as HTMLElement).querySelector('.ant-input') as HTMLInputElement;
    }

    qFocus() {
        this.focus = true;
    }

    qBlur() {
        this.focus = false;
        this.searchToggled = false;
    }
}

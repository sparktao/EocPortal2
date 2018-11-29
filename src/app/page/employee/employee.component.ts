import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  template: `
    <p>employee component</p>
    <div class="wrapper">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class EmployeeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

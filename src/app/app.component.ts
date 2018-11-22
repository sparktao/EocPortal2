import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { addMinutes } from 'date-fns';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo2';
  target = addMinutes(new Date, 10);
  constructor(private msg: NzMessageService) {}

  onEnd() {
    this.msg.success('finised');
  }
}

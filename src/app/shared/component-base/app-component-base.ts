import { Injector } from '@angular/core';
import { NotifyService } from '@shared/notify/notify.service';



export abstract class AppComponentBase {

  notify : NotifyService;

  constructor(injector: Injector) {
    this.notify = injector.get(NotifyService);

  }

  l(key: string): string {
    return key;
  }
}

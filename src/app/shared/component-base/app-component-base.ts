import { Injector } from '@angular/core';
import { NotifyService } from '@shared/notify/notify.service';
import { MessageService } from '@shared/message/message.service';



export abstract class AppComponentBase {

  notify : NotifyService;
  message: MessageService;

  constructor(injector: Injector) {
    this.notify = injector.get(NotifyService);
    this.message = injector.get(MessageService);

  }

  l(key: string): string {
    return key;
  }
}

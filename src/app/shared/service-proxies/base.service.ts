import { Injectable, InjectionToken } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export abstract class BaseService {

  appUrlBase = environment.apiUrlBase;

  constructor() { }
}

import { Injectable, InjectionToken } from '@angular/core';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class CommonService {

  constructor() { }
}

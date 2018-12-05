import { Injectable } from '@angular/core';
import {UserManager, User} from 'oidc-client';
import { environment } from 'environments/environment';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenIdConnectService {

  userManager: UserManager = new UserManager(environment.openIdConnectSettings);
  currentUser : User;

  userLoaded$ = new ReplaySubject<boolean>(1);

  get userAvailable(): boolean {
    return this.currentUser != null;
  }

  get user(): User {
    return this.currentUser;
  }


  constructor() {
    this.userManager.clearStaleState();
    this.userManager.getUser().then(user=>{
      if(user) {
        this.userLoaded$.next(true);
        this.currentUser = user;
      }
      else {
        this.userLoaded$.next(false);
      }
    }).catch(error =>{
      this.userLoaded$.next(false);
    });

    this.userManager.events.addUserLoaded(user => {
      if (!environment.production) {
        console.log('User loaded.', user);
      }
      this.currentUser = user;
      this.userLoaded$.next(true);
    });

    this.userManager.events.addUserUnloaded((e) => {
      if (!environment.production) {
        console.log('User unloaded');
      }
      this.currentUser = null;
      this.userLoaded$.next(false);
    });
  }

  triggerSignIn() {
    this.userManager.signinRedirect().then(()=>{
      if(!environment.production) {
        console.log('Redirection to signin triggered.');
      }
    }).catch(error=>{
      console.log(error);
    });
  }

  handleCallback() {
    this.userManager.signinRedirectCallback().then(user => {
      if (!environment.production) {
        console.log('Callback after signin handled.', user);
      }
    }).catch(error=>{
      console.log(error);
    });
  }

  handleSilentCallback() {
    this.userManager.signinSilentCallback().then(user => {
      this.currentUser = user;
      if (!environment.production) {
        console.log('Callback after silent signin handled.', user);
      }
    });
  }

  triggerSignOut() {
    this.userManager.signoutRedirect().then(resp => {
      if (!environment.production) {
        console.log('Redirection to sign out triggered.', resp);
      }
    });
  }


}

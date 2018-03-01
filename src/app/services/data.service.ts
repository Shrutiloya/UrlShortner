/**
 * Created by Shruti Loya on 2/27/2018.
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {

  private loggedIn = new BehaviorSubject<boolean>(null) ;


  constructor() { }

  public setLoginStatus(loggedIn: boolean) {
    this.loggedIn.next(loggedIn)
  }

   getLoginStatus(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public accessToken: string | null = localStorage.getItem('token');
  public isLogin = new BehaviorSubject<boolean>(false);
  constructor() {
    if (this.accessToken) this.isLogin.next(true);
    else this.isLogin.next(false);
  }
}

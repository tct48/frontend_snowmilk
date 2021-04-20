import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { AuthenService } from './authen.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(
    private authen: AuthenService,
    private http: HttpService
  ) { }

  onLogin(model: ILogin) {
    return this.http.requestPost("user/_post_login.php", model)
      .toPromise() as Promise<any>
  }

  onRegister(model: any) {
    return this.http.requestPost("user/_post.php", model)
      .toPromise() as Promise<any>
  }
}

export interface ILogin {
  username: string,
  password: string
}

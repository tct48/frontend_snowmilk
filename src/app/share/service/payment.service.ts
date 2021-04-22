import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { AuthenService } from './authen.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private http:HttpService,
    private authen: AuthenService
  ) { }

  insertPayment(model:any) {
    let url = `payment/_post.php`;
    return this.http.requestPost(url, model)
      .toPromise() as Promise<any>
  }
}

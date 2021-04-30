import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { AuthenService } from './authen.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private authen:AuthenService,
    private http:HttpService
  ) { }

  insertOrder(model:IOrder){
    console.log(model)
    return this.http.requestPost("orders/_post.php", model)
    .toPromise() as Promise<any>
  }

  insertAddress(model:any){
    return this.http.requestPost("orders/_post_address.php",model)
    .toPromise() as Promise<any>;
  }

  insertOrderDetail(model:any,_id:string){
    return this.http.requestPost(`orders/_post_detail.php?_id=${_id}`, model)
    .toPromise() as Promise<any>
  }

  loadOrderByID(_id:string){
    return this.http.requestGet(`orders/_get.php?_id=${_id}`,this.authen.getAuthenticated())
      .toPromise() as Promise<any>
  }

  loadOrderByUser(user:string){
    let url=`orders/_get.php?user=${user}`;
    return this.http.requestGet(url,this.authen.getAuthenticated())
      .toPromise() as Promise<any>
  }

  removeItemFromCartByID(_id:string){
    let url=`cart/_delete.php?_id=${_id}`;
    console.log(url);
    return this.http.requestDelete(url,this.authen.getAuthenticated())
      .toPromise() as Promise<any>;
  }

  loadOrderDetail(_id:string){
    let url=`orders/_get_success.php?_id=${_id}`;
    return this.http.requestGet(url,this.authen.getAuthenticated())
      .toPromise() as Promise<any>;
  }

  deleteCart(user:any){
    return this.http.requestDelete(`orders/_delete_cart.php?user=${user}`)
      .toPromise() as Promise<any>;
  }
}

export interface IOrder{
  user:number,
  discount:number,
  total:number
}

export interface IOdetail{
  product:number,
  pricr:number,
  qty:number
}
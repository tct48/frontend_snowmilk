import { Injectable } from '@angular/core';
import { promise } from 'selenium-webdriver';
import { HttpService } from '../http.service';
import { AuthenService } from './authen.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpService,
    private authen: AuthenService
  ) { }

  loadTopSix() {
    let url = "product/_get_top_six.php";
    return this.http.requestGet(url, this.authen.getAuthenticated())
      .toPromise() as Promise<any>
  }

  loadBestSeller() {
    let url = "product/_get_best_seller.php";
    return this.http.requestGet(url, this.authen.getAuthenticated())
      .toPromise() as Promise<any>
  }

  loadAllProduct(option: IOption) {
    let url = `product/_get.php?sp=${option.sp}&lp=${option.lp}`;
    if(option.category)
    url = `product/_get.php?sp=${option.sp}&lp=${option.lp}&category=${option.category}`;
    return this.http.requestGet(url, this.authen.getAuthenticated())
      .toPromise() as Promise<any>
  }

  loadProductByID(_id: string) {
    let url = `product/_get_by_id.php?_id=${_id}`;
    return this.http.requestGet(url, this.authen.getAuthenticated())
      .toPromise() as Promise<any>
  }

  loadRandomProduct(_id:string) {
    let url = `product/_get_random_four.php?_id=${_id}`;
    return this.http.requestGet(url, this.authen.getAuthenticated())
      .toPromise() as Promise<any>
  }

  // อัพเดทผู้เยี่ยมชม
  updateView(_id:string){
    let url = `product/_put_view.php`;
    return this.http.requestPut(url,this.authen.getAuthenticated(),{_id:_id})
      .toPromise() as Promise<any>
  }

  loadCart(_id:string){
    let url =`cart/_get.php?user=${_id}`;
    return this.http.requestGet(url, this.authen.getAuthenticated())
      .toPromise() as Promise<any>;
  }

  countCart(_id: string) {
    let url = `cart/_get_count.php?user=${_id}`;
    return this.http.requestGet(url, this.authen.getAuthenticated())
      .toPromise() as Promise<any>
  }

  addToCart(model: IAddCart) {
    let url = `cart/_post.php`;
    return this.http.requestPost(url, model)
      .toPromise() as Promise<any>;
  }
}

export interface IOption {
  sp: number,
  lp: number,
  category?:number
}

export interface IAddCart {
  user: string,
  product: string
}

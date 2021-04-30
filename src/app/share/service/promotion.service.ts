import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { AuthenService } from './authen.service';
import { IOption } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  constructor(
    private http: HttpService,
    private authen: AuthenService
  ) { }

  loadAllPromotion(option: IOption) {
    let url = `promotion/_get.php?sp=${option.sp}&lp=${option.lp}`;
    return this.http.requestGet(url, this.authen.getAuthenticated())
      .toPromise() as Promise<any>
  }

  loadPromotionByID(_id: string) {
    let url = `promotion/_get_by_id.php?_id=${_id}`;
    return this.http.requestGet(url, this.authen.getAuthenticated())
      .toPromise() as Promise<any>
  }

  loadCoupon(code: string) {
    let url = `promotion/_get_by_code.php?code=${code}`;
    return this.http.requestGet(url, this.authen.getAuthenticated())
      .toPromise() as Promise<any>
  }

  insertOEM(model: any) {
    console.log(model)
    let url = 'oem/_post.php';
    return this.http.requestPost(url, model)
      .toPromise() as Promise<any>;
  }
}

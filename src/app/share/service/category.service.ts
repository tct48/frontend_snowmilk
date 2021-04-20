import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { AuthenService } from './authen.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http:HttpService,
    private authen:AuthenService
  ) { }

  loadCategory(){
    let url="category/_get.php";
    return this.http.requestGet(url,this.authen.getAuthenticated())
      .toPromise() as Promise<any>
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthenService } from './service/authen.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient,private authen:AuthenService) { }
  // private address : string = "http://localhost/backend/api/";
  private address : string = "http://www.dee-jung.com/snowmilk/frontend/api/";

  requestGet(url:string, accessToken?:string){
    return this.http
      .get(`${this.address}${url}`,{
        headers: this.appendHeaders(accessToken),
      })
      .pipe(catchError(err=>this.handleError(err)))
  }

  requestPost(url:string, body:any){
    return this.http 
      .post(`${this.address}${url}`,body)
      .pipe(catchError(err=>this.handleError(err)));
  }

  requestPut(url:string, accessToken?:string, model?:any){
    return this.http
      .put(`${this.address}${url}`,model, {
        headers: this.appendHeaders(accessToken),
      })
      .pipe(catchError(err=> this.handleError(err)));
  }

  requestDelete(url:string, accessToken?:string){
    return this.http.delete(`${this.address}${url}`,{
      headers: this.appendHeaders(accessToken),
    })
    .pipe(catchError(err=>this.handleError(err)));
  }

  private handleError(errResponse:HttpErrorResponse):Observable<any>{
    if(errResponse.error && errResponse.error.message){
      errResponse = errResponse.error.message
    }throw errResponse;
  }

  appendHeaders(accessToken: any){
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + this.authen.getAuthenticated()
    };
    return new HttpHeaders(headersConfig);
  }
}

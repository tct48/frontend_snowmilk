import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  constructor() { }

  private accessKey = 'accessToken';
  private cart:number;

  setAuthenticated(accessToken:string, user:IUser):void{
    console.log(user);
    localStorage.setItem("login",user._id);
    localStorage.setItem("name", user.name);
    localStorage.setItem("cart",user.cart);
  }

  getNumCart(){
    return localStorage.getItem("cart");
  }



  getAuthenticated():string{
    return localStorage.getItem("login");
  }

  clearAuthenticated():void{
    localStorage.removeItem("name");
  }
}

export interface IUser{
  _id:string,
  username:string,
  password:string,
  name:string,
  rol:string,
  created_at:string,
  image:string,
  cart:string
}

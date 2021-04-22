import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../alert.service';
import { AuthenService } from '../service/authen.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-auth-nav-bar',
  templateUrl: './auth-nav-bar.component.html',
  styleUrls: ['./auth-nav-bar.component.css']
})
export class AuthNavBarComponent implements OnInit {

  constructor(
    private alert:AlertService,
    private authen:AuthenService,
    private product:ProductService,
    private activateRouter:ActivatedRoute,
    private router:Router
  ) { 
    this.checkLogin();
    this.cart = localStorage.getItem("cart");
    this.activateRouter.queryParams.forEach(element=>{
      this.r = element.r;
    })
  }

  name:string;
  cart:string;

  ngOnInit(): void {
  }

  login:boolean = false;
  r:string;

  checkLogin(){
    if(localStorage.getItem("login")){
      this.login = true;
      this.name = localStorage.getItem("name");
      this.cart = this.authen.getNumCart();
      this.getCart();
    }
  }

  getCart(){
    this.product.countCart(localStorage.getItem("login")).then(result=>{
      this.cart = result.cart;
    })
  }

  onLogout(){
    localStorage.removeItem("login");
    this.alert.success("ขอบคุณที่ใช้บริการค่ะ");
    setInterval(()=>{
      window.location.reload();
    },3000)
  }

}

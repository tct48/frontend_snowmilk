import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppURL } from '../app.url';
import { AlertService } from '../share/alert.service';
import { CategoryService } from '../share/service/category.service';
import { OrderService } from '../share/service/order.service';
import { PromotionService } from '../share/service/promotion.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(
    private router:Router,
    private category: CategoryService,
    private order: OrderService,
    private promotion:PromotionService,
    private activateRouter: ActivatedRoute
  ) {
    window.scrollTo(0, 0);
    this._id=localStorage.getItem("login");
    this.loadCategory();
    this.loadOrder();
    this.getPromotion();
    
  }

  _id: string;
  o: any={
    items:[],
    total_items:0
  };

  c: any = {
    items: [],
    total_items: 0
  }

  ngOnInit(): void {
  }

  loadOrder() {
    this.order.loadOrderByUser(this._id).then(result => {
      this.o = result;
    })
  }

  
    
  promote:any={
    total_items:0,
    items:[]
  }
  getPromotion(){
    this.promotion.loadAllPromotion({sp:0,lp:4}).then(result=>{
      this.promote = result;
      console.log(this.promote)
    })
  }

  loadCategory() {
    this.category.loadCategory().then(result => {
      this.c = result;
    })
  }

  goToSuccess(_id:string){
    this.router.navigate(['', AppURL.Success],{
      queryParams: {_id:_id}
    })
  }
}

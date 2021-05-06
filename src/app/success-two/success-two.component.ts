import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppURL } from '../app.url';
import { AlertService } from '../share/alert.service';
import { CategoryService } from '../share/service/category.service';
import { OrderService } from '../share/service/order.service';
import { PromotionService } from '../share/service/promotion.service';

@Component({
  selector: 'app-success-two',
  templateUrl: './success-two.component.html',
  styleUrls: ['./success-two.component.css']
})
export class SuccessTwoComponent implements OnInit {

  constructor(
    private category: CategoryService,
    private alert: AlertService,
    private order: OrderService,
    private promotion: PromotionService,
    private activateRouter: ActivatedRoute,
    private router: Router
  ) {
    window.scrollTo(0, 0);

    this.activateRouter.queryParams.forEach(params => {
      this._id = params._id;
      this.loadOrder();

      this.loadCategory();
  
      this.loadOrderDT();
      this.getPromotion();
    })


  }

  _id: string;
  o: any;

  c: any = {
    items: [],
    total_items: 0
  }

  ngOnInit(): void {
  }

  loadOrder() {
    this.order.loadOrderByID(this._id).then(result => {
      this.o = result;
      this.supply = Number(this.o.total) + Number(this.o.discount);
      console.log(this.supply)
    })
  }

  item: any = {
    items: [],
    total_items: 0
  }

  amount:number=0;

      
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

  loadOrderDT() {
    this.order.loadOrderDetail(this._id).then(result => {
      this.item = result;
      result.items.forEach(element => {
        this.amount += element.price * element.qty;
      });
    })
  }

  loadCategory() {
    this.category.loadCategory().then(result => {
      this.c = result;
    })
  }
  supply:number=0;
  goToPayment() {
    this.router.navigate(['', AppURL.Payment], {
      queryParams: { _id: this._id }
    });
  }

}

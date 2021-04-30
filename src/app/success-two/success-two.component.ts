import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppURL } from '../app.url';
import { AlertService } from '../share/alert.service';
import { CategoryService } from '../share/service/category.service';
import { OrderService } from '../share/service/order.service';

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
    private activateRouter: ActivatedRoute,
    private router: Router
  ) {
    window.scrollTo(0, 0);

    this.activateRouter.queryParams.forEach(params => {
      this._id = params._id;
      this.loadOrder();

      this.loadCategory();
  
      this.loadOrderDT();
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
      console.log(result)
    })
  }

  item: any = {
    items: [],
    total_items: 0
  }

  amount:number=0;

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

  goToPayment() {
    this.router.navigate(['', AppURL.Payment], {
      queryParams: { _id: this._id }
    });
  }

}

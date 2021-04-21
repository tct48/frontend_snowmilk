import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../share/alert.service';
import { CategoryService } from '../share/service/category.service';
import { OrderService } from '../share/service/order.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(
    private category: CategoryService,
    private alert: AlertService,
    private order: OrderService,
    private activateRouter: ActivatedRoute
  ) {
    window.scrollTo(0, 0)
    this.activateRouter.queryParams.forEach(params => {
      if (!params._id) {
        this.alert.notify();
        return;
      }

      this._id = params._id;
      this.loadOrder();

      this.loadCategory();
    })
  }

  _id: string;
  o: any;
  mytime: Date = new Date();

  c: any = {
    items: [],
    total_items: 0
  }

  ngOnInit(): void {
  }

  loadOrder() {
    this.order.loadOrderByID(this._id).then(result => {
      this.o = result;
      console.log(this.o);
    })
  }

  loadCategory() {
    this.category.loadCategory().then(result => {
      this.c = result;
    })
  }

}

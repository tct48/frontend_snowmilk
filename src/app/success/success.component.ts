import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppURL } from '../app.url';
import { AlertService } from '../share/alert.service';
import { CategoryService } from '../share/service/category.service';
import { OrderService } from '../share/service/order.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(
    private category: CategoryService,
    private alert: AlertService,
    private order: OrderService,
    private activateRouter: ActivatedRoute,
    private router:Router
  ) {
    window.scrollTo(0, 0)
    this.activateRouter.queryParams.forEach(params => {
      if(!params._id){
        this.router.navigateByUrl("/home")
        return;
      }
      
      this._id=params._id;
      this.loadOrder();

      this.loadCategory();
    })
  }

  _id:string;
  o:any;

  c:any={
    items:[],
    total_items:0
  }

  ngOnInit(): void {
  }

  loadOrder(){
    this.order.loadOrderByID(this._id).then(result=>{
      this.o = result;
    })
  }

  loadCategory(){
    this.category.loadCategory().then(result=>{
      this.c = result;
    })
  }

  goToPayment(){
    this.router.navigate(['', AppURL.Payment], {
      queryParams: { _id: this._id }
    });
  }

}

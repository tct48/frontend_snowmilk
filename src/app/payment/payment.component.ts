import { DatePipe } from '@angular/common';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppURL } from '../app.url';
import { AlertService } from '../share/alert.service';
import { CategoryService } from '../share/service/category.service';
import { OrderService } from '../share/service/order.service';
import { PaymentService } from '../share/service/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(
    private builder:FormBuilder,
    private category: CategoryService,
    private alert: AlertService,
    private order: OrderService,
    private activateRouter: ActivatedRoute,
    private datePipe: DatePipe,
    private payment:PaymentService,
    private router:Router
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
      this.initialForm();
    })
  }

  _id: string;
  o: any;
  mytime: Date = new Date();

  form:FormGroup;

  c: any = {
    items: [],
    total_items: 0
  }

  initialForm(){
    this.form = this.builder.group({
      bank:['',Validators.required],
      dor:['',Validators.required],
      time:['',Validators.required],
      amount:['', Validators.required],
      verify:['',Validators.required],
      orders:[this._id,Validators.required]
    })
  }

  ngOnInit(): void {
  }

  loadOrder() {
    this.order.loadOrderByID(this._id).then(result => {
      this.o = result;
    })
  }

  loadCategory() {
    this.category.loadCategory().then(result => {
      this.c = result;
    })
  }

  onSubmit(){
    if(this.form.invalid){
      this.alert.notify("กรอกข้อมูลให้ครบถ้วน!");
      return;
    }

    this.form.controls["dor"].setValue(this.getDateTime());
    
    this.payment.insertPayment(this.form.value).then(result=>{
      console.log(result);
      this.alert.success("แจ้งชำระเงินเรียบร้อยแล้ว โปรดรอการตรวจสอบ!");
      this.router.navigate(['', AppURL.Success],{
        queryParams: {_id:this._id}
      })
    })
    
  }

  getDateTime(){
    var date = this.form.controls["dor"].value;
    date = this.datePipe.transform(date,"yyyy-MM-dd");
    var time = this.form.controls["time"].value;
    time = this.datePipe.transform(time,"HH:mm:s");
    var dor = date + " " + time;
    return  dor;
  }
}

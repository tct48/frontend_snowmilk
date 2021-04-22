import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Builder } from 'selenium-webdriver';
import { AppURL } from '../app.url';
import { AlertService } from '../share/alert.service';
import { CategoryService } from '../share/service/category.service';
import { IOdetail, IOrder, OrderService } from '../share/service/order.service';
import { ProductService } from '../share/service/product.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  customClass = 'customClass';
  constructor(
    private builder: FormBuilder,
    private category: CategoryService,
    private product: ProductService,
    private alert: AlertService,
    private order: OrderService,
    private router: Router
  ) {
    this.loadCate();
    this.loadItem();
    this.initialForm();
  }

  ngOnInit(): void {
  }


  c: any = {
    items: [],
    total_items: 0
  }

  qty: any = [];
  amount: any = 0;

  item: any = {
    items: [],
    total_items: 0
  }

  form: FormGroup;

  initialForm() {
    this.form = this.builder.group({
      orders: [''],
      name: ['', Validators.required],
      addr: ['', Validators.required],
      subdis: ['', Validators.required],
      dis: ['', Validators.required],
      prov: ['', Validators.required],
      post: ['', Validators.required]
    })
  }

  loadCate() {
    this.category.loadCategory().then(result => {
      this.c = result;
    })
  }

  model = [];
  loadItem() {
    this.product.loadCart(localStorage.getItem("login")).then(result => {
      this.item = result;
      this.item.items.forEach(element => {
        this.model.push(element._id)
      });

    })
  }

  calculate() {
    this.amount = 0;
    for (var i = 0; i < this.qty.length; i++) {
      this.amount = parseInt(this.amount) + parseInt(this.item.items[i].price) * parseInt(this.qty[i]);
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.alert.notify("กรุณากรอกที่อยู่จัดส่งให้ครบถ้วน!");
      return;
    }

    if (this.amount == 0) {
      this.alert.notify("กรุณารุบุจำนวนของสินค้า!")
      return;
    }

    var obj: IOrder = {
      user: parseInt(localStorage.getItem("login")),
      total: this.amount
    };


    this.order.insertOrder(obj).then(result => {
      var orders = result.orders;
      this.form.controls["orders"].setValue(orders);
      this.order.insertOrderDetail(this.model, orders).then(result => {
        // เพิ่มข้อมูลรายละเอียดใบเสร็จสำเร็จ
        this.order.deleteCart(localStorage.getItem("login")).then(result => {
          this.order.insertAddress(this.form.value).then(result => {
            this.alert.success("ดำเนินการเสร็จสิ้นขั้นสุดท้าย!");
            setInterval(() => {
              this.router.navigate(['', AppURL.Success], {
                queryParams: { _id: orders }
              });
            }, 1500);
          })
        })
      })
    })
  }

  onRemove(_id:string){
    this.order.removeItemFromCartByID(_id).then(result=>{
      this.loadItem();
    })
  }
}


// orders:number,
// product:number,
// pricr:number,
// qty:number
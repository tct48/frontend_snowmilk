import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Builder } from 'selenium-webdriver';
import { AppURL } from '../app.url';
import { AlertService } from '../share/alert.service';
import { CategoryService } from '../share/service/category.service';
import { IOdetail, IOrder, OrderService } from '../share/service/order.service';
import { ProductService } from '../share/service/product.service';
import { PromotionService } from '../share/service/promotion.service';

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
    private promotion: PromotionService,
    private router: Router
  ) {
    this.loadCate();
    this.loadItem();
    this.initialForm();
    this.loadProvince();
    this.getPromotion();
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


  promote: any = {
    total_items: 0,
    items: []
  }
  getPromotion() {
    this.promotion.loadAllPromotion({ sp: 0, lp: 4 }).then(result => {
      this.promote = result;
      console.log(this.promote)
    })
  }

  isChecked: boolean = false;
  checkValue(event: any) {
    var qty = 0;
    for (var i = 0; i < this.qty.length; i++) {
      if (this.item.items[i].category == "Snowmilk Gelato")
        qty += this.qty[i];
    }
    if (event == "true") {
      this.isChecked = true;
      if (qty >= 10 && qty < 15) {
        this.discount = 60;
      } else if (qty >= 15 && qty < 20) {
        this.discount = 180;
      } else if (qty >= 20) {
        this.discount = 300;
      } else {
        this.alert.notify("ไม่ตรงตามเงื่อนไขการซื้อสินค้า")
      }
    } else {
      this.isChecked = false;
    }
  }

  loadCate() {
    this.category.loadCategory().then(result => {
      this.c = result;
    })
  }

  model = [];
  coupon: string;
  promo_condition: any;
  loadItem() {
    this.product.loadCart(localStorage.getItem("login")).then(result => {
      this.item = result;
      this.item.items.forEach(element => {
        this.model.push(element)
      });

    })
  }

  calculate() {
    this.amount = 0;
    for (var i = 0; i < this.qty.length; i++) {
      this.amount = parseInt(this.amount) + parseInt(this.item.items[i].price) * parseInt(this.qty[i]);
    }
  }

  shipping: number = 0;

  onChange(value) {
    if (value == "กรุงเทพมหานคร") {
      this.shipping = 150;
    } else {
      this.shipping = 250;
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
      discount: this.discount,
      total: this.amount + this.shipping - this.discount
    };

    for (var i = 0; i < this.model.length; i++) {
      this.model[i].qty = this.qty[i];
    }


    this.order.insertOrder(obj).then(result => {
      var orders = result.orders;
      this.form.controls["orders"].setValue(orders);
      console.log(result)
      this.order.insertOrderDetail(this.model, orders).then(result => {
        console.log(result)
        // เพิ่มข้อมูลรายละเอียดใบเสร็จสำเร็จ
        this.order.deleteCart(localStorage.getItem("login")).then(result => {
          this.order.insertAddress(this.form.value).then(result => {
            this.alert.success("ดำเนินการเสร็จสิ้นขั้นสุดท้าย!");
            this.router.navigate(['', AppURL.Success], {
              queryParams: { _id: orders }
            });
          })
        })
      })
    })
  }


  discount: number = 0;
  onCoupon() {
    this.promotion.loadCoupon(this.coupon).then(result => {
      this.promo_condition = result.items;
      console.log(result)
      if (result.total_items == 1) {
        if (this.promo_condition[0].type == 2) {
          if (this.amount >= this.promo_condition[0].condit) {
            this.discount = this.amount * this.promo_condition[0].discount / 100;
            if (this.discount > this.promo_condition[0].max_discount) {
              this.discount = this.promo_condition[0].max_discount;
            }
          }
        } else if (this.promo_condition[0].type == 1) {
          var qty = 0;
          for (var i = 0; i < this.qty.length; i++) {
            qty += this.qty[i];
          }
          if (qty >= this.promo_condition[0].condit) {
            this.discount = this.amount * this.promo_condition[0].discount/100;
            if (this.discount > this.promo_condition[0].max_discount && this.promo_condition[0].max_discount != 0) {
              this.discount = this.promo_condition[0].max_discount;
            } else if (this.promo_condition[0].max_discount == 0) {
              this.discount = this.amount * this.promo_condition[0].discount / 100;
            }
          } else {
            this.discount = 0;
          }
        }
      } else {
        this.alert.notify("รหัสคูปองไม่ถูกต้อง หรือหมดอายุแล้ว")
      }
    })
  }

  onRemove(_id: string) {
    this.order.removeItemFromCartByID(_id).then(result => {
      this.loadItem();
    })
  }

  province: any;
  loadProvince() {
    this.province = [
      "กระบี่",
      "กรุงเทพมหานคร",
      "กาญจนบุรี",
      "กาฬสินธุ์",
      "กำแพงเพชร",
      "ขอนแก่น",
      "จันทบุรี",
      "ฉะเชิงเทรา",
      "ชลบุรี",
      "ชัยนาท",
      "ชัยภูมิ",
      "ชุมพร",
      "เชียงราย",
      "เชียงใหม่",
      "ตรัง",
      "ตราด",
      "ตาก",
      "นครนายก",
      "นครปฐม",
      "นครพนม",
      "นครราชสีมา",
      "นครศรีธรรมราช",
      "นครสวรรค์",
      "นนทบุรี",
      "นราธิวาส",
      "น่าน",
      "บึงกาฬ",
      "บุรีรัมย์",
      "ปทุมธานี",
      "ประจวบคีรีขันธ์",
      "ปราจีนบุรี",
      "ปัตตานี",
      "พระนครศรีอยุธยา",
      "พะเยา",
      "พังงา",
      "พัทลุง",
      "พิจิตร",
      "พิษณุโลก",
      "เพชรบุรี",
      "เพชรบูรณ์",
      "แพร่",
      "ภูเก็ต",
      "มหาสารคาม",
      "มุกดาหาร",
      "แม่ฮ่องสอน",
      "ยโสธร",
      "ยะลา",
      "ร้อยเอ็ด",
      "ระนอง",
      "ระยอง",
      "ราชบุรี",
      "ลพบุรี",
      "ลำปาง",
      "ลำพูน",
      "เลย",
      "ศรีสะเกษ",
      "สกลนคร",
      "สงขลา",
      "สตูล",
      "สมุทรปราการ",
      "สมุทรสงคราม",
      "สมุทรสาคร",
      "สระแก้ว",
      "สระบุรี",
      "สิงห์บุรี",
      "สุโขทัย",
      "สุพรรณบุรี",
      "สุราษฎร์ธานี",
      "สุรินทร์",
      "หนองคาย",
      "หนองบัวลำภู",
      "อ่างทอง",
      "อำนาจเจริญ",
      "อุดรธานี",
      "อุตรดิตถ์",
      "อุทัยธานี",
      "อุบลราชธานี"
    ]
  }
}


// orders:number,
// product:number,
// pricr:number,
// qty:number
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppURL } from '../app.url';
import { AlertService } from '../share/alert.service';
import { ProductService } from '../share/service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(
    private alert: AlertService,
    private router: Router,
    private product: ProductService,
    private activateRouter: ActivatedRoute
  ) {
    window.scrollTo(0, 0);
    this.activateRouter.queryParams.forEach(params => {
      this._id = params.id;
      if (!this._id) {
        this.alert.notify("เข้าหน้าเพจอย่างไม่ถูกต้อง!");
        this.router.navigateByUrl("/home");
        return;
      }
      this.loadRandomProduct();

      this.product.updateView(this._id).then(result=>{
      });

      this.getCart();

      this.product.loadProductByID(this._id).then(result => {
        this.p = result;

        this.name = this.p.name;
        this.category = this.p.category;
        this.image = this.p.image;
        this.price = this.p.price;
        this.taste = this.p.taste;
      })

      this.cart = localStorage.getItem("cart");
      this.userid = localStorage.getItem("login");
    })
  }

  _id: string;
  p: IProduct;
  // model
  name: string;
  category: string;
  image: string;
  price: string;
  taste: string;
  cart: string;

  userid:string;

  rand_product: any = {
    items: [],
    total_item: 0
  }

  ngOnInit(): void {
  }

  loadRandomProduct() {
    this.product.loadRandomProduct(this._id).then(result => {
      this.rand_product = result;
      console.log(result)
    })
  }

  addOnCart(_id: string) {
    var obj = {
      product: _id,
      user: localStorage.getItem("login")
    }
    this.product.addToCart(obj).then(result => {
      localStorage.setItem("cart", result.cart);
      this.getCart();
      this.alert.success("เพิ่มสินค้าลงตะกร้าสำเร็จ!");
      setInterval(() => {
        window.location.reload();
      },1500);
    })
  }

  changeProduct(_id: string, el: HTMLElement) {
    el.scrollIntoView();
    this.router.navigate(['', AppURL.ProductDetail], {
      queryParams: { id: _id }
    })
  }

  getCart() {
    this.product.countCart(localStorage.getItem("login")).then(result => {
      this.cart = result.cart;
    })
  }
}

export interface IProduct {
  _id: string,
  name: string,
  category: string,
  taste: string,
  image: string,
  price: string
}
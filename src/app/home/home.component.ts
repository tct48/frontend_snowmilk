import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppURL } from '../app.url';
import { AlertService } from '../share/alert.service';
import { IOption, ProductService } from '../share/service/product.service';
import { PromotionService } from '../share/service/promotion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private product: ProductService,
    private alert: AlertService,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private promotion:PromotionService
  ) {
    window.scrollTo(0, 0);
    this.loadProductTop()
    this.loadBestSell();

    this.loadPromotion();
    this.loadProduct();
    // let el = document.getElementById('navbar');
    // el.scrollTop = el.scrollHeight;
  }

  r: string;

  ngOnInit(): void {
  }

  top_product: any = {
    items: [],
    total_items: 0
  }

  best_seller: any = {
    items: [],
    total_items: 0
  }

  loadProductTop() {
    this.product.loadTopSix().then(result => {
      this.top_product = result;
    })
  }
  option:IOption={
    sp:0,
    lp:4
  }

  promote:any = {
    items:[],
    total_items:0
  }

  p:any={
    items:[],
    total_items:0
  }

  loadProduct(){
    this.product.loadAllProduct(this.option).then(result=>{
      this.p = result;
    });
  }

  loadPromotion(){
    this.promotion.loadAllPromotion(this.option).then(result=>{
      this.promote = result;
      console.log("*******************************")
      console.log(result);
    })
  }

  // เวลาผู้ใช้คลิกสินค้าที่มีผู้คนให้ความสนใจมากที่สุด
  loadProductByID(_id: string) {
    this.router.navigate(['', AppURL.ProductDetail], {
      queryParams: { id: _id }
    })
  }

  // แสดงสินค้าที่มีคนสั่งซื้อมากที่สุด
  loadBestSell() {
    this.product.loadBestSeller().then(result => {
      this.best_seller = result;
    })
  }

}

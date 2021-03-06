import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppURL } from '../app.url';
import { AlertService } from '../share/alert.service';
import { IOption, ProductService } from '../share/service/product.service';
import { PromotionService } from '../share/service/promotion.service';

@Component({
  selector: 'app-scoll-promotion',
  templateUrl: './scoll-promotion.component.html',
  styleUrls: ['./scoll-promotion.component.css']
})
export class ScollPromotionComponent implements OnInit {
  @ViewChild("promotion") MyProp: ElementRef;
  constructor(
    private product: ProductService,
    private alert: AlertService,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private promotion:PromotionService
  ) {

    this.loadProductTop()
    this.loadBestSell();

    this.loadPromotion();
    this.loadProduct();
    // let el = document.getElementById('navbar');
    // el.scrollTop = el.scrollHeight;
  }

  r: string;

  ngOnInit() {
    setTimeout(() => {
      this.MyProp.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 500);
  }

  top_product: any = {
    items: [],
    total_items: 0
  }

  best_seller: any = {
    items: [],
    total_items: 0
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

import { Component, OnInit } from '@angular/core';
import { AlertService } from '../share/alert.service';
import { ProductService } from '../share/service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private product:ProductService,
    private alert:AlertService
  ) { 
    this.loadProductTop()
    this.loadBestSell();
  }

  ngOnInit(): void {
  }

  top_product:any={
    items:[],
    total_items:0
  }

  best_seller:any={
    items:[],
    total_items:0
  }

  loadProductTop(){
    this.product.loadTopSix().then(result=>{
      this.top_product = result;
    })
  }

  // เวลาผู้ใช้คลิกสินค้าที่มีผู้คนให้ความสนใจมากที่สุด
  loadProductByID(_id:string){
    this.alert.notify(_id);
  }

  // แสดงสินค้าที่มีคนสั่งซื้อมากที่สุด
  loadBestSell(){
    this.product.loadBestSeller().then(result=>{
      this.best_seller=result;
    })
  }

}

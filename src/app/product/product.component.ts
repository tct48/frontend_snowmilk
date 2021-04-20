import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppURL } from '../app.url';
import { CategoryService } from '../share/service/category.service';
import { IOption, ProductService } from '../share/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(
    private category: CategoryService,
    private product: ProductService,
    private router:Router
  ) {
    window.scrollTo(0, 0);
    this.loadCate();
    this.loadProduct(this.option);
    this.cart = localStorage.getItem("cart");
  }

  ngOnInit(): void {
  }

  cart:string;

  c: any = {
    items: [],
    total_items: 0
  }

  p:any = {
    items:[],
    total_items:0
  }


  loadCate() {
    this.category.loadCategory().then(result => {
      // console.log(result);
      this.c = result;
    })
  }

  option: IOption = { sp: 0, lp: 8 };

  loadProduct(option: IOption) {
    this.product.loadAllProduct(this.option).then(result=>{
      console.log(result);
      this.p = result;
    })
  }

  // ไปยังหน้า product-detail 
  goToProductDetailOf(_id:string){
    this.router.navigate(['', AppURL.ProductDetail],{
      queryParams: {id:_id}
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private activateRouter: ActivatedRoute,
  ) {
    window.scrollTo(0, 0);
    this.loadCate();
    this.cart = localStorage.getItem("cart");
    this.activateRouter.queryParams.forEach(params => {
      if(params.category){
        this.option.category=params.category;
      }else{
        this.option.category=1;
      }
      this.loadProduct(this.option);
    });
  }

  ngOnInit(): void {
  }

  cart: string;

  c: any = {
    items: [],
    total_items: 0
  }

  p: any = {
    items: [],
    total_items: 0
  }

  sq:number = 0;

  loadCate() {
    this.category.loadCategory().then(result => {
      this.c = result;
    })
  }

  option: IOption = { sp: 0, lp: 8 };

  loadProduct(option: IOption) {
    this.product.loadAllProduct(this.option).then(result => {
      this.p = result;
    })
  }

  onLoadMore(){
    this.option.sp+=1;
    this.product.loadAllProduct(this.option).then(result=>{
      result.items.forEach(element => {
        this.p.items.push(element);
      });
    })
  }

  // ไปยังหน้า product-detail 
  goToProductDetailOf(_id: string) {
    this.router.navigate(['', AppURL.ProductDetail], {
      queryParams: { id: _id }
    })
  }

}

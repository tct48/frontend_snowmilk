import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-auth-content',
  templateUrl: './auth-content.component.html',
  styleUrls: ['./auth-content.component.css']
})
export class AuthContentComponent implements OnInit {

  constructor(
    private product:ProductService
  ) { 
    this.getFoot();
  }

  ngOnInit(): void {
  }

  top_product:any={
    total_items:0,
    items:[]
  }

  getFoot(){
    this.product.loadFooter().then(result=>{
      this.top_product = result;
      console.log(this.top_product)
    })
  }

}

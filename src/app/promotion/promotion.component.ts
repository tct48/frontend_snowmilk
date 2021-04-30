import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PromotionService } from '../share/service/promotion.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {

  constructor(
    private promotion:PromotionService,
    private activateRouter:ActivatedRoute
  ) { 
    window.scrollTo(0, 0);
    this.activateRouter.queryParams.forEach(params => {
      this._id = params._id;
      this.loadAll();
    })
  }

  _id:string;
  items:any;

  ngOnInit(): void {
  }

  loadAll(){
    this.promotion.loadPromotionByID(this._id).then(result=>{
      this.items = result.items;
      console.log(result);
    })
  }
}

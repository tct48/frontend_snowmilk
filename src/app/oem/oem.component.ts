import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../share/alert.service';
import { PromotionService } from '../share/service/promotion.service';

@Component({
  selector: 'app-oem',
  templateUrl: './oem.component.html',
  styleUrls: ['./oem.component.css']
})
export class OemComponent implements OnInit {

  constructor(
    private builder:FormBuilder,
    private alert:AlertService,
    private promotion:PromotionService
  ) { 
    this.initialForm();
  }

  ngOnInit(): void {
  }

  form:FormGroup;

  initialForm(){
    this.form = this.builder.group({
      firstname: ['',Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
      text: ['', Validators.required],
      address: ['', Validators.required]
    })
  }

  onSubmit(){
    if(this.form.invalid){
      this.alert.notify("กรุณากรอกข้อมูลให้ครบถ้วน!");
      return;
    }

    this.promotion.insertOEM(this.form.value).then(result=>{
      if(result.message=="เพิ่มข้อมูลสำเร็จ"){
        this.alert.success("ขอบคุณที่ใช้บริการ");
      }

      this.form.reset();
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../share/alert.service';
import { AuthenService } from '../share/service/authen.service';
import { MemberService } from '../share/service/member.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private member: MemberService,
    private authen: AuthenService,
    private router: Router
  ) {
    this.initialForm();
  }

  ngOnInit(): void {
  }

  form: FormGroup;

  initialForm() {
    this.form = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onLogin() {
    if (this.form.invalid) {
      this.alert.notify("กรุณากรอกข้อมูลให้ครบถ้วน!");
      return;
    }


    this.member.onLogin(this.form.value).then(result => {
      if (result.total_items > 1) {
        this.alert.notify("เกิดข้อผิดพลาดบางอย่างกรุณาแจ้งผู้จัดการ");
        return;
      }
      console.log(result)
      if (result.total_items == 1 && result.items[0]._id!=null) {
        this.authen.setAuthenticated("accessKey",result.items[0]);
        this.router.navigateByUrl("/home");
      }else{
        this.alert.notify("ไม่พบข้อมูลผู้ใช้งาน");
      }
    }).catch(err => {
    })
  }

  forgetPassword(){
    this.alert.success("รหัสผ่านใหม่ส่งไปที่อีเมล์เรียบร้อยแล้ว!");
  }

}

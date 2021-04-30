import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../share/alert.service';
import { AuthenService } from '../share/service/authen.service';
import { MemberService } from '../share/service/member.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

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
      password: ['', Validators.required],
      new_password: ['',Validators.required],
      cnew_password: ['',Validators.required]
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      this.alert.notify("กรุณากรอกข้อมูลให้ครบถ้วน!");
      return;
    }

    if(this.form.controls["new_password"].value != this.form.controls["cnew_password"].value){
      this.alert.notify("รหัสผ่านใหม่ และยืนยันรหัสผ่านไม่ตรงกัน!");
      return ;
    }

    console.log(this.form.value)
    // return;
    this.member.onChangePassword(this.form.value).then(result=>{
      console.log(result)
      if(result.message!="ไม่พบข้อมูล"){
        this.alert.success(result.message);
        this.router.navigateByUrl("/login")
        return
      }else{
        this.alert.notify("ไม่พบ Username หรือ Password นี้ในระบบ");
      }
    })
  }

}

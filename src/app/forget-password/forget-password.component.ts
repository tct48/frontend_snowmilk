import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../share/alert.service';
import { AuthenService } from '../share/service/authen.service';
import { MemberService } from '../share/service/member.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {


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
      email: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      this.alert.notify("กรุณากรอกข้อมูลให้ครบถ้วน!");
      return;
    }

    console.log(this.form.value)
    // return;
    this.member.onForgetPassword(this.form.value).then(result => {
      if (result.message == "แก้ไขข้อมูลรหัสผ่านสำเร็จ") {
        this.alert.success("รหัสผ่านถูกส่งไปยังอีเมล์เรียบร้อยแล้ว!");
        this.router.navigateByUrl("/change-password");
      }else{
        console.log(result)
      }
    })
  }
}

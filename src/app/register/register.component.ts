import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../share/alert.service';
import { MemberService } from '../share/service/member.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[MemberService]
})
export class RegisterComponent implements OnInit {

  constructor(
    private builder:FormBuilder,
    private member:MemberService,
    private alert:AlertService,
    private router: Router
  ) { 
    this.initialForm();
  }

  ngOnInit(): void {
  }

  form:FormGroup

  initialForm(){
    this.form = this.builder.group({
      username:['',Validators.required],
      password:['',Validators.required],
      c_password:['',Validators.required],
      firstname:['',Validators.required],
      lastname: ['', Validators.required]
    })
  }

  // Register
  onSubmit(){
    if(this.form.invalid){
      this.alert.notify("กรุณากรอกข้อมูลให้ครบถ้วน")
      return;
    }
    
    var x=[];
    x.push(this.form.controls["password"].value);
    x.push(this.form.controls["c_password"].value);
    if(x[0]!=x[1]){
      this.alert.notify("คุณใส่รหัสผ่านทั้ง 2 ครั้งไม่ตรงกัน!");
      return ;
    }

    this.member.onRegister(this.form.value).then(result=>{
      this.alert.success("สมัครสมาชิกสำเร็จ");
      this.router.navigateByUrl("/login");
    }).catch(err=>{
      console.log(err)
    })

  }
}

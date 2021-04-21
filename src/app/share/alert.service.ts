import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  success(title:string='บันทึกข้อมูลเรียบร้อยแล้ว'){
    Swal.fire({
      icon: 'success',
      title:title,
      showConfirmButton: false,
      timer:1500,
      timerProgressBar:true
    })
  }

  notify(title:string="เกิดข้อผิดพลาด"){
    Swal.fire({
      icon:'error',
      title:title,
      showConfirmButton:false,
      timerProgressBar:true,
      timer:1500
    })
  }

  waiting(){
    Swal.fire({
      showConfirmButton: false,
      timer:2000,
      timerProgressBar:true
    })
  }
}

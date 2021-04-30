import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppURL } from '../app.url';
import { AlertService } from '../share/alert.service';
import { CategoryService } from '../share/service/category.service';
import { OrderService } from '../share/service/order.service';
import { PaymentService } from '../share/service/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(
    private builder: FormBuilder,
    private category: CategoryService,
    private alert: AlertService,
    private order: OrderService,
    private activateRouter: ActivatedRoute,
    private datePipe: DatePipe,
    private payment: PaymentService,
    private http: HttpClient,
    private router: Router
  ) {
    window.scrollTo(0, 0)
    this.activateRouter.queryParams.forEach(params => {
      if (!params._id) {
        this.alert.notify();
        return;
      }

      this._id = params._id;
      this.loadOrder();

      this.loadCategory();
      this.initialForm();
    })
  }

  _id: string;
  o: any;
  mytime: Date = new Date();

  form: FormGroup;

  c: any = {
    items: [],
    total_items: 0
  }

  initialForm() {
    this.form = this.builder.group({
      bank: ['', Validators.required],
      dor: ['', Validators.required],
      time: ['', Validators.required],
      amount: ['', Validators.required],
      verify: ['', Validators.required],
      orders: [this._id, Validators.required]
    })
  }

  ngOnInit(): void {
  }

  loadOrder() {
    this.order.loadOrderByID(this._id).then(result => {
      this.o = result;
    })
  }

  loadCategory() {
    this.category.loadCategory().then(result => {
      this.c = result;
    })
  }

  onSubmit() {
    this.form.controls["dor"].setValue(this.getDateTime());
    if (this.location)
      this.form.controls['verify'].setValue('http://www.dee-jung.com/snowmilk/uploads/payments/' + this.location);
    else
      this.form.controls['verify'].setValue('');
    if (this.form.invalid) {
      this.alert.notify("กรอกข้อมูลให้ครบถ้วน!");
      return;
    }


    this.uploadImage();

    this.payment.insertPayment(this.form.value).then(result => {
      console.log(result);
      this.alert.success("แจ้งชำระเงินเรียบร้อยแล้ว โปรดรอการตรวจสอบ!");
      this.router.navigate(['', AppURL.Success], {
        queryParams: { _id: this._id }
      })
    })

  }

  getDateTime() {
    var date = this.form.controls["dor"].value;
    date = this.datePipe.transform(date, "yyyy-MM-dd");
    var time = this.form.controls["time"].value;
    time = this.datePipe.transform(time, "HH:mm:s");
    var dor = date + " " + time;
    return dor;
  }


  file = new FormControl('');
  file_data: any;

  location: string;
  imageSrc: string;

  fileChange(event) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[event.target.files.length - 1]);
      reader.onload = (event: any) => {
        this.imageSrc = event.target.result;
      }
    }
    const fileList: FileList = event.target.files;
    //check whether file is selected or not
    if (fileList.length > 0) {
      const file = fileList[event.target.files.length - 1];

      //get file information such as name, size and type
      console.log('finfo', file.name, file.size, file.type);
      this.location = this._id + "-" + file.name;

      //max file size is 4 mb
      if ((file.size / 1048576) <= 4) {
        let formData = new FormData();
        let info = { id: 2, name: 'raja' }
        formData.append('file', file, this.location);
        formData.append('id', '2');
        formData.append('tz', new Date().toISOString())
        formData.append('update', '2')
        formData.append('info', JSON.stringify(info))
        this.file_data = formData;
        this.form.controls["image"].setValue("jj")
      } else {
        //this.snackBar.open('File size exceeds 4 MB. Please choose less than 4 MB','',{duration: 2000});
      }
    }
  }

  ip = "http://www.dee-jung.com/snowmilk/frontend/api/payment/";
  result: string;
  uploadImage() {
    this.http.post(this.ip + 'upload-file.php', this.file_data)
      .subscribe(res => {
        //send success response
        console.log(res);
      }, (err) => {
        //send error response
        console.log(err);
        this.result = err.error.text;
      });
  }
}

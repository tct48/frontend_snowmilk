import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { HomeComponent } from './home/home.component';
import { AuthContentComponent } from './share/auth-content/auth-content.component';
import { AuthNavBarComponent } from './share/auth-nav-bar/auth-nav-bar.component';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';
import { ProductComponent } from './product/product.component';

import { ProductDetailComponent } from './product-detail/product-detail.component';



// Angular bootstrap module
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaymentComponent } from './payment/payment.component';
import { OrdersComponent } from './orders/orders.component';
import { AlertService } from './share/alert.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { PromotionComponent } from './promotion/promotion.component';
import { SuccessTwoComponent } from './success-two/success-two.component';
import { OemComponent } from './oem/oem.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AboutComponent } from './about/about.component';
import { ScollPromotionComponent } from './scoll-promotion/scoll-promotion.component';
import { PageScrollService } from 'ng2-page-scroll';

const OtherComponent = [
  FormsModule,
  HttpClientModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  // ButtonsModule.forRoot(),
  TooltipModule.forRoot(),
  CollapseModule.forRoot(),
  AccordionModule.forRoot(),
  BsDatepickerModule.forRoot(),
  TimepickerModule.forRoot()
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthContentComponent,
    AuthNavBarComponent,
    RegisterComponent,
    SigninComponent,
    ProductComponent,
    ProductDetailComponent,
    ShoppingCartComponent,
    PaymentComponent,
    OrdersComponent,
    DateAgoPipe,
    PromotionComponent,
    SuccessTwoComponent,
    OemComponent,
    ChangePasswordComponent,
    ForgetPasswordComponent,
    AboutComponent,
    ScollPromotionComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    AppRoutingModule,
    OtherComponent
  ],
  providers: [
    AlertService,
    DatePipe,
    PageScrollService,
    {
      provide: LocationStrategy, useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

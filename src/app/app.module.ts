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
import { SuccessComponent } from './success/success.component';
import { PaymentComponent } from './payment/payment.component';
import { OrdersComponent } from './orders/orders.component';
import { AlertService } from './share/alert.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const OtherComponent = [
  FormsModule,
  HttpClientModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  // ButtonsModule.forRoot(),
  TooltipModule.forRoot(),
  AccordionModule.forRoot()
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
    SuccessComponent,
    PaymentComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    AppRoutingModule,
    OtherComponent
  ],
  providers: [AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }

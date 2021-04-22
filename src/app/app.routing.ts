import { Routes, RouterModule } from '@angular/router'
import { AppURL } from './app.url'
import { AuthenticationGuard } from './guard/authentication.guard';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductComponent } from './product/product.component';
import { PromotionComponent } from './promotion/promotion.component';
import { RegisterComponent } from './register/register.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SigninComponent } from './signin/signin.component';
import { SuccessComponent } from './success/success.component';

const RouterLists: Routes = [
    { path:'', redirectTo: AppURL.Home,pathMatch:'full' },
    { path:AppURL.Home, component: HomeComponent },
    { path:AppURL.Signin, component: SigninComponent },
    { path:AppURL.Register, component: RegisterComponent },
    { path:AppURL.Product, component:ProductComponent },
    { path:AppURL.ShoppingCart, component:ShoppingCartComponent,canActivate:[AuthenticationGuard] },
    { path:AppURL.Success, component:SuccessComponent,canActivate:[AuthenticationGuard] },
    { path:AppURL.Payment, component:PaymentComponent,canActivate:[AuthenticationGuard] },
    { path:AppURL.Orders, component:OrdersComponent,canActivate:[AuthenticationGuard] },
    { path:AppURL.Promotion, component:PromotionComponent },
    {
        path:AppURL.ProductDetail, component:ProductDetailComponent
    }
    // { path:AppURL.Authen,loadChildren:()=> AuthenticationModule,canActivate:[AuthenticationGuard] }
]

export const AppRouting = RouterModule.forRoot(RouterLists);

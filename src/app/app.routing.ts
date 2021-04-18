import { Routes, RouterModule } from '@angular/router'
import { AppURL } from './app.url'
import { HomeComponent } from './home/home.component';

const RouterLists: Routes = [
    { path:'', redirectTo: AppURL.Home,pathMatch:'full' },
    { path:AppURL.Home, component: HomeComponent },
    // { path:AppURL.Authen,loadChildren:()=> AuthenticationModule,canActivate:[AuthenticationGuard] }
]

export const AppRouting = RouterModule.forRoot(RouterLists);

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { AuthGuard } from './core/auth.guard';
import { CatalogueComponent } from './modules/catalogue/catalogue.component';
import { WishListComponent } from './modules/wish-list/wish-list.component';
import { CartComponent } from './modules/cart/cart.component';
import { FullProductComponent } from './modules/full-product/full-product.component';
import { IndexComponent } from './modules/index/index.component';
import { CheckoutComponent } from './modules/checkout/checkout.component';
import { CheckoutFormComponent } from './modules/checkout/checkout-form/checkout-form.component';
import { OrderInfoComponent } from './modules/order-info/order-info.component';


const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'cat', component: CatalogueComponent },
  { path: 'cat/:type', component: CatalogueComponent },
  { path: 'wish-list', component: WishListComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'completeOrder', component: CheckoutFormComponent, canActivate: [AuthGuard] },
  { path: 'order', component: OrderInfoComponent, canActivate: [AuthGuard] },
  { path: 'order/:id', component: OrderInfoComponent, canActivate: [AuthGuard] },
  { path: 'product/:id', component: FullProductComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/:route', component: LoginComponent },
  { path: 'login/:route/:secondRoute', component: LoginComponent },
  { path: '**', component: CatalogueComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

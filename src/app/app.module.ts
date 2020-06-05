import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { NbThemeModule, NbLayoutModule, NbButtonModule, NbTooltipModule, NbSelectModule, NbContextMenuModule, NbMenuModule, NbUserModule, NbAccordionModule, NbActionsModule, NbDialogModule, NbToastrModule, NbCardModule, NbInputModule, NbTabsetModule, NbStepperModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbIconModule } from '@nebular/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import * as firebase from 'firebase';
import { ProfileComponent } from './modules/profile/profile.component';
import { WishListComponent } from './modules/wish-list/wish-list.component';
import { CartComponent } from './modules/cart/cart.component';
import { CatalogueComponent } from './modules/catalogue/catalogue.component';
import { FullProductComponent } from './modules/full-product/full-product.component';
import { CatalogueItemCardComponent } from './modules/catalogue/catalogue-item-card/catalogue-item-card.component';
import { LoginComponent } from './modules/login/login.component';
firebase.initializeApp(environment.firebase);
import { FlexLayoutModule } from '@angular/flex-layout';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { IndexComponent } from './modules/index/index.component';
import { ContactComponent } from './modules/contact/contact.component';
import { DatePipe } from '@angular/common';
import { DialogImagesComponent } from './modules/dialog-images/dialog-images.component';
import { CheckoutComponent } from './modules/checkout/checkout.component';
import { LogoutComponent } from './modules/logout/logout.component';
import { CheckoutFormComponent } from './modules/checkout/checkout-form/checkout-form.component';
import { OrderInfoComponent } from './modules/order-info/order-info.component';
import { AboutComponent } from './modules/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    WishListComponent,
    CartComponent,
    CatalogueComponent,
    FullProductComponent,
    CatalogueItemCardComponent,
    IndexComponent,
    ContactComponent,
    DialogImagesComponent,
    CheckoutComponent,
    LogoutComponent,
    CheckoutFormComponent,
    OrderInfoComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, 
    AngularFireAuthModule, 
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbButtonModule,
    NbEvaIconsModule,
    NbIconModule,
    NbTooltipModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NbSelectModule,
    NbContextMenuModule,
    NbMenuModule.forRoot(),
    NbMenuModule,
    NbUserModule,
    NbAccordionModule,
    NbActionsModule,
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    NgxSpinnerModule,
    NbCardModule,
    FlexLayoutModule,
    IvyCarouselModule,
    NbDialogModule.forRoot(),
    NbInputModule,
    NbStepperModule,
    FormsModule, ReactiveFormsModule

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

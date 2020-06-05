import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FullItem, cartItem } from 'src/app/core/item';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Order } from 'src/app/core/order';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/core/user.service';
import { NbToastrService, NbIconConfig } from '@nebular/theme';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private toastrService: NbToastrService, private router: Router, private fb: FormBuilder, private angularFS: AngularFirestore, private user: UserService, ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.items = this.router.getCurrentNavigation().extras.state.items;
    }
    if (!this.items) {
      this.router.navigate(['/cart'])
    }

  }

  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  items: FullItem[];
  totalPrice: number;
  order: Order;
  itemsArr: number[] = [];
  userEmail: string;
  ordersLength: number;
  cartItems: cartItem[] = [];
  cartItemsFiltered: cartItem[] = [];

  getTotalPrice() {
    this.totalPrice = 0;
    this.items.forEach(ele => {
      this.totalPrice += Number(ele.price);
    })
  }

  // proceedCheckout(){
  //   this.router.navigate(['/checkout'], {state: {items:this.items}});
  // }

  onFirstSubmit() {
    this.firstForm.markAsDirty();
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }

  placeOrder() {
    this.ordersLength += 10000;
    // console.log(this.firstForm)
    this.order = { id: this.ordersLength, date: new Date(), userEmail: this.userEmail, items: this.itemsArr, price: this.totalPrice, phoneNumber: this.firstForm.value.phoneNumber, fullAdress: this.firstForm.value.fullAdress }
    // console.log(this.cartItems)
    // console.log(this.itemsArr)

    this.cartItemsFiltered = this.cartItems.filter(ele => !this.itemsArr.includes(ele.id))


    if (this.cartItemsFiltered.length == 0) {
      this.angularFS.collection("cart").doc(this.userEmail).delete().then(function () {
        console.log("Document successfully deleted!");
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
    }
    else if (this.cartItemsFiltered.length > 0)
      this.angularFS.collection("cart").doc(this.userEmail).set({ id: this.cartItemsFiltered });

    // console.log(this.cartItemsFiltered)
    this.angularFS.collection("orders").add(this.order).then(res => {
      const iconConfig: NbIconConfig = { icon: 'checkmark-circle-outline', pack: 'eva' };
      this.toastrService.show(
        ``,
        `Order Completed!`,
        iconConfig
      );
      this.router.navigate(['/profile']);
    }).catch(err => console.log(err))
  }

  getOrders() {
    this.angularFS.collection<Order>("orders").valueChanges().subscribe(
      items => {
        this.ordersLength = items.length;
      })
  }

  getUser() {
    new Promise(
      (resolve, reject) => {
        this.user.getCurrentUser().then(user => {
          if (user) {
            this.userEmail = user.email;
            this.getOrders();
            this.getCart();
          }
          else {
            this.userEmail = null;
          }
        })
      }
    )
  }

  getCart() {
    this.angularFS.collection<number>("cart").doc(this.userEmail).valueChanges().subscribe(
      items => {
        this.cartItems = [];
        if (items != undefined) {
          for (let [key, value] of Object.entries(items)) {
            value.forEach(element => {
              this.cartItems.push(element)
            });
          }
        }
        else {
          this.cartItems = [];
        }
      })
  }


  ngOnInit(): void {
    this.getTotalPrice();
    // console.log(this.items)
    this.firstForm = this.fb.group({
      fullAdress: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });

    this.items.forEach(ele => {
      this.itemsArr.push(ele.id);
    })
    this.getUser();
    this.secondForm = this.fb.group({
      okCtrl: ['', Validators.required],
    });
  }
}
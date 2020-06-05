import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/core/order';
import { UserService } from 'src/app/core/user.service';
import { User } from 'src/app/core/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css']
})
export class OrderInfoComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private router: Router, private user: UserService, private angularFS: AngularFirestore, private spinner: NgxSpinnerService, ) { }
  orderId: number;
  userInfo: User;
  userEmail: string;
  orders: Order[] = [];
  orderBelongsToUser: boolean = false;

  checkBelong() {
    if (this.orders[0].userEmail == this.userInfo.userEmail) { this.orderBelongsToUser = true };
    this.spinner.hide();
  }

  getUser() {
    new Promise(
      (resolve, reject) => {
        this.user.getCurrentUser().then(user => {
          if (user) {
            this.userInfo = { userName: user.displayName, userImage: user.photoURL, userEmail: user.email }
            this.userEmail = user.email;
            this.getOrder();
          }
          else {
            this.userInfo = null;
            this.spinner.hide();
          }
        })
      }
    )
  }

  getOrder() {
    this.angularFS.collection<Order>("orders").valueChanges().subscribe(
      items => {
        if (items != undefined) {
          this.orders = items.filter(ele => ele.id == this.orderId)
          if (this.orders.length > 0) {
            this.checkBelong();
          }
          else {
            this.spinner.hide();
          }
        }
        else {
          this.orders = null;
          this.spinner.hide();
        }
      })
  }
  ngOnInit(): void {
    this.spinner.show();
    this.activeRoute.params.subscribe(params => {
      this.orderId = params.id;
    })
    this.getUser();


    if (!this.orderId) {
      this.router.navigate(['/profile']);
    }
  }

}

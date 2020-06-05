import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/user.service';
import { User } from 'src/app/core/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { Order } from 'src/app/core/order';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfo: User;
  orders: Order[] = [];

  constructor(private user: UserService, private angularFS: AngularFirestore, private spinner: NgxSpinnerService, ) { }

  getOrders() {
    this.angularFS.collection<Order>("orders").valueChanges().subscribe(
      items => {
        if (items != undefined) {
          this.orders = items.filter(ele => ele.userEmail == this.userInfo.userEmail)
          // console.log(items)
          // console.log(this.orders)
          this.spinner.hide();
        }
        else {
          this.orders = null;
          this.spinner.hide();
        }
      })
  }

  getUser() {
    new Promise(
      (resolve, reject) => {
        this.user.getCurrentUser().then(user => {
          if (user) {
            // console.log(user)
            this.userInfo = { userName: user.displayName, userImage: user.photoURL, userEmail: user.email }
            // console.log(this.userInfo)
            this.getOrders();
          }
          else {
            this.userInfo = null;
          }
        })
      }
    )
  }
  ngOnInit(): void {
    this.getUser();
    this.spinner.show();
  }

}

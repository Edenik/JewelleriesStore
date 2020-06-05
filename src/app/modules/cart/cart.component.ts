import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/core/api.service';
import { UserService } from 'src/app/core/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';
import { NbToastrService, NbIconConfig, NbDialogService } from '@nebular/theme';
import { FullItem, cartItem } from 'src/app/core/item';
import { ContactComponent } from '../contact/contact.component';
import { DialogImagesComponent } from '../dialog-images/dialog-images.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private api: ApiService, private router: Router,
    private spinner: NgxSpinnerService, private user: UserService, private angularFS: AngularFirestore, private toastrService: NbToastrService,
    private dialogService: NbDialogService) { }
  userEmail: string
  idList: cartItem[] = [];
  item: FullItem;
  itemsList: FullItem[] = [];
  itemsToShow: FullItem[] = [];
  totalCartPrice: number = 0;
  checkOutItems: number[] = [];




  getUser() {
    new Promise(
      (resolve, reject) => {
        this.user.getCurrentUser().then(user => {
          if (user) {
            this.userEmail = user.email;
            this.getCart();
          }
          else {
            this.userEmail = null;
          }
        })
      }
    )
  }

  showImages(images_arr, image) {
    images_arr.unshift(image)
    this.dialogService.open(DialogImagesComponent, {
      context: {
        images: images_arr,
      },
    });
  }

  contact(item) {
    this.dialogService.open(ContactComponent, {
      context: {
        item: item,
      },
    });
  }
  removeFromCart(id) {
    const iconConfig: NbIconConfig = { icon: 'heart-outline', pack: 'eva' };
    this.toastrService.show(
      `ID: ${id}`,
      `Item removed from cart!`,
      iconConfig
    );
    // console.log(this.idList)

    let filtered = this.idList.filter(item => item.id != id);
    this.idList = filtered;
    // console.log(this.idList)
    if (this.idList.length == 0) {
      this.itemsToShow = [];
      this.angularFS.collection("cart").doc(this.userEmail).delete().then(function () {
        console.log("Document successfully deleted!");
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
    }
    else if (this.idList.length > 0)
      this.angularFS.collection("cart").doc(this.userEmail).set({ id: this.idList });
  }
  getCart() {

    this.angularFS.collection<number>("cart").doc(this.userEmail).valueChanges().subscribe(
      items => {
        this.itemsList = [];
        this.idList = [];
        if (items != undefined) {
          this.totalCartPrice = 0;
          for (let [key, value] of Object.entries(items)) {
            value.forEach(element => {
              this.idList.push(element)
            });
          }
          this.idList.forEach(element => {
            // console.log(element.id)
            this.getItem(element.id, element.dateAdded);
          });

        }
        else {
          this.spinner.hide();
          this.itemsToShow = [];
        }
      })
  }


  getItem(id, dateAdded) {
    this.api.getItem(id).subscribe(element => {
      for (let [key, value] of Object.entries(element)) {
        if (key == 'current_item') {
          this.pushItem(value, dateAdded)
        }
      }
    })
  }

  pushItem(item, dateAdded) {
    this.item = {
      current_item: null,
      certs: null,
      color: null,
      discount: null,
      id: null,
      image: null,
      images_arr: null,
      j_center_total_weight: null,
      j_metal_weight: null,
      j_side_total_weight: null,
      j_type: null,
      long_desc: null,
      metal_color: null,
      metal_type: null,
      name: null,
      price: null,
      price_status: null,
      sale_price: null,
      short_desc: null,
      sku: null,
      title: null,
      type: null,
      weight: null,
      dateAdded: null
    };

    for (let [key, value] of Object.entries(item)) {
      this.item[key] = value;
    }
    this.item.dateAdded = dateAdded;
    this.itemsList.push(this.item)
    // console.log(this.itemsList)
    this.itemsToShow = this.itemsList;
    // console.log(this.itemsToShow)
    if (this.idList.length == this.itemsToShow.length) {
      this.itemsToShow.forEach(element => {
        if (Number(element.price) > 0) {
          this.totalCartPrice += Number(element.price)
        }
      });
      this.sort();
    }
  }

  sort() {
    var sortedArray: FullItem[] = this.itemsToShow.sort((obj1, obj2) => {
      var sortObject1 = obj1.dateAdded;
      var sortObject2 = obj2.dateAdded;
      if (sortObject1 < sortObject2)
        return 1;
      if (sortObject1 > sortObject2)
        return -1;
      return 0;
    });
    this.itemsToShow = sortedArray;
    this.spinner.hide();

  }

  proceedCheckout() {
    var filteredItems = this.itemsToShow.filter(item => Number(item.price) > 0);

    // console.log(this.checkOutItems);
    this.router.navigate(['/checkout'], { state: { items: filteredItems } });

  }

  ngOnInit(): void {
    this.spinner.show();

    this.getUser()
  }

}

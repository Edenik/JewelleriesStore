import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/core/local-storage.service';
import { NbIconConfig, NbToastrService, NbDialogService } from '@nebular/theme';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/core/user.service';
import { FullItem, cartItem } from 'src/app/core/item';
import { ApiService } from 'src/app/core/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContactComponent } from '../contact/contact.component';
import { DialogImagesComponent } from '../dialog-images/dialog-images.component';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  constructor(private localStorage: LocalStorageService, private user: UserService,
    private toastrService: NbToastrService, private angularFS: AngularFirestore, private api: ApiService, private dialogService: NbDialogService,
    private spinner: NgxSpinnerService, ) { }
  wishList: cartItem[] = [];
  userEmail: string;
  cartIdList: cartItem[] = [];
  item: FullItem;
  itemsList: FullItem[] = [];
  itemsToShow: boolean;

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
    // console.log(images_arr)
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

  getCart() {
    this.angularFS.collection<number>("cart").doc(this.userEmail).valueChanges().subscribe(
      items => {
        // this.itemsList = [];
        this.cartIdList = [];

        if (items != undefined) {
          for (let [key, value] of Object.entries(items)) {
            value.forEach(element => {
              this.cartIdList.push(element)
            });
          }
          // console.log(this.cartIdList)
        }
        this.spinner.hide();
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
    this.sort();

  }

  sort() {
    if (this.wishList.length == this.itemsList.length) {
      var sortedArray: FullItem[] = this.itemsList.sort((obj1, obj2) => {
        var sortObject1 = obj1.dateAdded;
        var sortObject2 = obj2.dateAdded;
        if (sortObject1 < sortObject2)
          return 1;
        if (sortObject1 > sortObject2)
          return -1;
        return 0;
      });
      this.itemsList = sortedArray;
      this.spinner.hide();

    }
  }


  removeFromWishList(id) {
    const iconConfig: NbIconConfig = { icon: 'heart-outline', pack: 'eva' };
    this.toastrService.show(
      `ID: ${id}`,
      `Item removed from wish-list!`,
      iconConfig
    );
    // console.log(this.itemsList)
    this.wishList = this.localStorage.getObjFromStorage("jewellery-wish-list");
    var filtered = this.wishList.filter(item => item.id != id)
    this.wishList = [];
    this.wishList = filtered;
    var filteredItems = this.itemsList.filter(item => item.id != id);
    this.itemsList = filteredItems;
    // console.log(this.itemsList)
    if (this.wishList.length == 0) {
      this.itemsToShow = false;
    }

    this.localStorage.saveObjToStorage(this.wishList, "jewellery-wish-list")
  }

  addToCart(id) {
    const iconConfig: NbIconConfig = { icon: 'heart-outline', pack: 'eva' };
    this.toastrService.show(
      `ID: ${id}`,
      `Item added to cart!`,
      iconConfig
    );

    this.cartIdList.push({ id: id, dateAdded: new Date() });
    this.angularFS.collection("cart").doc(this.userEmail).set({ id: this.cartIdList });
  }

  checkItem(id) {
    var bool = false;
    this.cartIdList.forEach(ele => {
      if (ele.id == id) {
        bool = true;
      }
    })
    return bool;
  }

  removeFromCart(id) {
    const iconConfig: NbIconConfig = { icon: 'heart-outline', pack: 'eva' };
    this.toastrService.show(
      `ID: ${id}`,
      `Item removed from cart!`,
      iconConfig
    );
    let filtered = this.cartIdList.filter(item => item.id != id);
    this.cartIdList = filtered;
    // console.log(this.cartIdList)

    if (this.cartIdList.length == 0) {
      this.angularFS.collection("cart").doc(this.userEmail).delete().then(function () {
        console.log("Document successfully deleted!");
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
    }
    else
      this.angularFS.collection("cart").doc(this.userEmail).set({ id: this.cartIdList });
  }

  getWishList() {
    this.wishList = this.localStorage.getObjFromStorage("jewellery-wish-list");
    // console.log(this.wishList)
    if (this.wishList != null && this.wishList.length > 0) {
      this.itemsToShow = true;
      this.wishList.forEach(element => {
        this.getItem(element.id, element.dateAdded);
      });
      this.getUser();
    }
    else {
      // console.log('no items')
      this.itemsToShow = false;
      this.wishList = null;
      this.spinner.hide();
    }
  }


  ngOnInit(): void {
    this.spinner.show();
    this.getWishList();
  }

}

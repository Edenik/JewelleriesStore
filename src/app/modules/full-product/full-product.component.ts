import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { Item, FullItem, Like, cartItem } from 'src/app/core/item';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/core/user';
import { UserService } from 'src/app/core/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { NbToastrService, NbIconConfig, NbDialogService } from '@nebular/theme';
import { DialogImagesComponent } from '../dialog-images/dialog-images.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-full-product',
  templateUrl: './full-product.component.html',
  styleUrls: ['./full-product.component.css']
})
export class FullProductComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private api: ApiService, private toastrService: NbToastrService,
    private spinner: NgxSpinnerService, private user: UserService, private angularFS: AngularFirestore, private dialogService: NbDialogService, ) { }

  userEmail: string
  userInfo: User;

  id: string;
  imageObject: Array<object> = [];
  idList: cartItem[] = [];
  addedToCart: boolean = false;
  likesArr: Like[] = [];
  dislikesArr: Like[] = [];
  like: Like[] = []
  itemStatus: string = null;
  totalWeight: number = 0;

  item: FullItem = {
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
    weight: null
  };

  addLike() {
    const iconConfig: NbIconConfig = { icon: 'heart-outline', pack: 'eva' };
    if (this.itemStatus == 'like') {
      this.toastrService.show(``, `Already Liked!`, iconConfig);
    }
    else {
      this.toastrService.show(``, `Thank you for your like!`, iconConfig);
      if (this.itemStatus == 'dislike') {
        this.like = this.like.filter(ele => ele.user != this.userEmail)
      }
      this.itemStatus = 'like';
      this.like.push({ user: this.userEmail, type: 'like' })
      // console.log(this.like)
      this.angularFS.collection("likes").doc(this.id).set({ likes: this.like });
    }
  }

  addDislike() {
    const iconConfig: NbIconConfig = { icon: 'heart-outline', pack: 'eva' };
    if (this.itemStatus == 'dislike') {
      this.toastrService.show(``, `Already DisLiked!`, iconConfig);
    }
    else {
      this.toastrService.show(``, `Thank you for your dislike!`, iconConfig);
      if (this.itemStatus == 'like') {
        this.like = this.like.filter(ele => ele.user != this.userEmail)
      }
      this.itemStatus = 'dislike';
      this.like.push({ user: this.userEmail, type: 'dislike' })
      // console.log(this.like)
      this.angularFS.collection("likes").doc(this.id).set({ likes: this.like });
    }
  }


  getLikes(id) {
    this.angularFS.collection<any>("likes").doc(id).valueChanges().subscribe(
      likes => {
        if (likes) {
          // console.log(likes)
          for (let [key, value] of Object.entries(likes)) {
            // console.error(key)
            for (let [key, val] of Object.entries(value)) {
              if (key == '0') {
                this.like = value;
              }
            }
          }
          this.likesArr = this.like.filter(ele => ele.type == 'like');
          this.dislikesArr = this.like.filter(ele => ele.type == 'dislike');
          this.likesArr.forEach(element => { if (element.user == this.userEmail) { this.itemStatus = 'like' } });
          this.dislikesArr.forEach(element => { if (element.user == this.userEmail) { this.itemStatus = 'dislike' } });
        }
        else {
          this.itemStatus = 'none';
        }
      });
  }

  getItem(id) {
    this.spinner.show();

    this.api.getItem(id).subscribe(element => {
      for (let [key, value] of Object.entries(element)) {
        if (key == 'current_item') {
          this.pushItem(value)
        }
      }
    })
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

  contact() {
    this.dialogService.open(ContactComponent, {
      context: {
        item: this.item,
      },
    });
  }

  pushItem(item) {
    for (let [key, value] of Object.entries(item)) {
      this.item[key] = value;
    }
    this.item.images_arr.unshift(String(this.item.image))

    this.item.images_arr.forEach(element => {
      this.imageObject.push({ path: element });
    });

    this.totalWeight = Number(this.item.j_center_total_weight) + Number(item.j_metal_weight) + Number(item.j_side_total_weight);
    this.item.long_desc = (this.item.long_desc.substr(9, this.item.long_desc.length - 19));

    // console.log(this.imageObject)
    // console.log(this.item)
  }

  addToCart(id) {
    const iconConfig: NbIconConfig = { icon: 'heart-outline', pack: 'eva' };
    this.toastrService.show(
      `ID: ${id}`,
      `Item added to cart!`,
      iconConfig
    );

    this.idList.push({ id: id, dateAdded: new Date() });
    this.angularFS.collection("cart").doc(this.userEmail).set({ id: this.idList });
    this.addedToCart = true;
  }

  removeFromCart(id) {
    const iconConfig: NbIconConfig = { icon: 'heart-outline', pack: 'eva' };
    this.toastrService.show(
      `ID: ${id}`,
      `Item removed from cart!`,
      iconConfig
    );
    let filtered = this.idList.filter(item => item.id != id);
    this.idList = filtered;
    this.addedToCart = false;


    if (this.idList.length == 0) {
      this.angularFS.collection("cart").doc(this.userEmail).delete().then(function () {
        console.log("Document successfully deleted!");
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
    }
    else
      this.angularFS.collection("cart").doc(this.userEmail).set({ id: this.idList });
  }

  getCart() {
    this.angularFS.collection<number>("cart").doc(this.userEmail).valueChanges().subscribe(
      items => {
        this.idList = [];
        // console.log(items)
        if (items != undefined) {
          // console.log(items)
          for (let [key, value] of Object.entries(items)) {
            value.forEach(element => {
              this.idList.push(element)
            });
          }
          this.idList.forEach(element => {
            if (element.id == Number(this.id)) {
              this.addedToCart = true;
              this.spinner.hide();

            }
          });
        }
        else
          this.addedToCart = false;
        this.spinner.hide();

      })
  }

  getUser() {
    new Promise(
      (resolve, reject) => {
        this.user.getCurrentUser().then(user => {
          if (user) {
            this.userInfo = { userName: user.displayName, userImage: user.photoURL, userEmail: user.email }
            this.userEmail = user.email;
            // console.log(this.userInfo)
            this.getCart();
          }
          else {
            this.userInfo = null;
            this.userEmail = null;
            setTimeout(() => {
              this.spinner.hide();
            }, 500);
          }
        })
      }
    )
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      // console.log(params)
      this.id = params.id;
      this.getLikes(params.id);

    })

    this.getItem(this.id);
    this.getUser();
  }

}

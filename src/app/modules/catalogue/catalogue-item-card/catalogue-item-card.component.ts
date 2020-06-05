import { Component, OnInit, Input } from '@angular/core';
import { Item, cartItem } from 'src/app/core/item';
import { NbIconConfig, NbToastrService, NbDialogService } from '@nebular/theme';
import { LocalStorageService } from 'src/app/core/local-storage.service';
import { ContactComponent } from '../../contact/contact.component';

@Component({
  selector: 'app-catalogue-item-card',
  templateUrl: './catalogue-item-card.component.html',
  styleUrls: ['./catalogue-item-card.component.css']
})
export class CatalogueItemCardComponent implements OnInit {

  constructor(private toastrService: NbToastrService, private localStorage: LocalStorageService,
    private dialogService: NbDialogService, ) { }
  @Input() item: Item;
  imageObject: Array<object> = [];
  wishList: cartItem[] = [];
  isWishList: boolean = false;



  contact() {
    this.dialogService.open(ContactComponent, {
      context: {
        item: this.item,
      },
    });
    // .onClose.subscribe( );
  }

  addToWishList(sku, id) {
    const iconConfig: NbIconConfig = { icon: 'heart-outline', pack: 'eva' };
    this.toastrService.show(
      `SKU: ${sku} ID: ${id}`,
      `Item added to wish-list!`,
      iconConfig
    );

    this.wishList = this.localStorage.getObjFromStorage("jewellery-wish-list");
    if (this.wishList == null) {
      this.wishList = [];
    }
    this.wishList.push({ id: id, dateAdded: new Date() });
    this.localStorage.saveObjToStorage(this.wishList, "jewellery-wish-list")
    this.isWishList = true;
  }

  removeFromWishList(sku, id) {
    const iconConfig: NbIconConfig = { icon: 'heart-outline', pack: 'eva' };
    this.toastrService.show(
      `SKU: ${sku} ID: ${id}`,
      `Item removed from wish-list!`,
      iconConfig
    );

    this.wishList = this.localStorage.getObjFromStorage("jewellery-wish-list");
    this.wishList = this.wishList.filter(item => item.id != id)
    this.localStorage.saveObjToStorage(this.wishList, "jewellery-wish-list")
    this.isWishList = false;
  }


  ngOnInit(): void {
    this.wishList = this.localStorage.getObjFromStorage("jewellery-wish-list");
    if (this.wishList == null)
      this.wishList = [];

    this.wishList.forEach(ele => {
      if (ele.id == this.item.id) {
        this.isWishList = true;
      }
    })

    this.item.images_arr.forEach(element => {
      this.imageObject.push({ path: element });
    });
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { FullItem } from 'src/app/core/item';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { DialogImagesComponent } from '../dialog-images/dialog-images.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private router: Router, private dialogService: NbDialogService) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.items = this.router.getCurrentNavigation().extras.state.items;
    }
    if (!this.items) {
      this.router.navigate(['/cart'])
    }

  }

  items: FullItem[];
  totalPrice: number;

  showImages(images_arr, image) {
    images_arr.unshift(image)
    this.dialogService.open(DialogImagesComponent, {
      context: {
        images: images_arr,
      },
    });
  }

  removeFromCheckOut(id) {
    this.items = this.items.filter(item => item.id != id)
    this.getTotalPrice();
  }

  getTotalPrice() {
    this.totalPrice = 0;
    this.items.forEach(ele => {
      this.totalPrice += Number(ele.price);
    })
  }

  proceedCheckout() {
    this.router.navigate(['/completeOrder'], { state: { items: this.items } });
  }
  ngOnInit(): void {
    this.getTotalPrice();

  }
}

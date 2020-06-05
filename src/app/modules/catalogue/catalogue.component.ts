import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbMenuService } from '@nebular/theme';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/api.service';
import { NbToastrService, NbIconConfig } from '@nebular/theme';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgxSpinnerService } from "ngx-spinner";
import { Item } from 'src/app/core/item';
import { Page } from 'src/app/core/page';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {
  items: Item[];
  item: Item;
  page_data: Page;
  //  = [{
  //   "total": null,
  //   "num_pages": null,
  //   "page": null,
  //   "per_page": null,
  //   "sort_by": null,
  // }]
  selected_type: string;
  selected_metal_type: string[] = [];
  selected_shape: string[] = [];
  selected_weight: string[] = [];
  selected_price: string[] = [];
  sort_by: string = "";
  selected_page: number = 1;
  sortOptions = [{ title: "Price: Low to High" },
  { title: "Price: High to Low" },
  { title: "Weight: Low to High" },
  { title: "Weight: High to Low" },
  { title: "Most Popular" }];

  metalsOptions = [{ item_id: 1, item_text: '18K White Gold' },
  { item_id: 2, item_text: '18K Yellow Gold' },
  { item_id: 3, item_text: '18K Rose Gold' },
  { item_id: 4, item_text: 'Platinum' }];

  weightOptions = [{ item_id: 1, item_text: '0.01-0.50 Ct.', value: '0.50|' },
  { item_id: 2, item_text: '0.50-1.00 Ct.', value: '0.50-1.00' },
  { item_id: 3, item_text: '1.00-2.00 Ct.', value: '1.00-2.00' },
  { item_id: 4, item_text: '2.00-5.00 Ct.', value: '2.00-5.00' },
  { item_id: 5, item_text: '5.00+ Ct.', value: '|5.00' }];

  priceOptions = [{ item_id: 1, item_text: 'Up to $5,000' },
  { item_id: 2, item_text: '$5,000-$10,000' },
  { item_id: 3, item_text: '$10,000-$25,000' },
  { item_id: 4, item_text: '$25,000-$50,000' },
  { item_id: 5, item_text: '$50,000+' }];

  shapesOptions = [{ item_id: 1, item_text: 'cushion' },
  { item_id: 2, item_text: 'radiant' },
  { item_id: 3, item_text: 'round' },
  { item_id: 4, item_text: 'pear' },
  { item_id: 5, item_text: 'emerald' },
  { item_id: 6, item_text: 'oval' },
  { item_id: 7, item_text: 'heart' },
  { item_id: 8, item_text: 'marquise' },
  { item_id: 9, item_text: 'asscher' },
  { item_id: 10, item_text: 'princess' }];

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };


  constructor(private activeRoute: ActivatedRoute, private api: ApiService,
    private nbMenuService: NbMenuService, private toastrService: NbToastrService,
    private spinner: NgxSpinnerService) { }

  wishList(sku, id) {
    const iconConfig: NbIconConfig = { icon: 'heart-outline', pack: 'eva' };
    this.toastrService.show(
      `SKU: ${sku} ID: ${id}`,
      `Item added to wish-list!`,
      iconConfig
    );
  }
  sortBy(object) {
    // console.log('sortby ' + object)
    switch (object) {
      case "Price: Low to High":
        this.sort_by = "priceasc"
        break;
      case "Price: High to Low":
        this.sort_by = "pricedesc"
        break;
      case "Weight: Low to High":
        this.sort_by = "weightasc"
        break;
      case "Weight: High to Low":
        this.sort_by = "weightdesc"
        break;
      case "Most Popular":
        this.sort_by = "mostpopular"
        break;
      case "Profile":
        break;
      default:
        break;
    }
    this.getData();
  }

  onItemSelect(item: any, type: any) {
    switch (type) {
      case 'metal':
        this.setMetalType(item.item_text, 'select');
        break;
      case 'weight':
        this.setWeight(item.item_text, 'select');
        break;
      case 'shape':
        this.setShapeType(item.item_text, 'select');
        break;
      case 'price':
        this.setPrice(item.item_text, 'select');
        break;
    }
    // console.log(item.item_text);
    // console.log('type: ' + type);
  }

  onSelectAll(items: any, type: string) {
    switch (type) {
      case 'metal':
        this.setMetalType('all', 'select');
        break;
      case 'weight':
        this.setWeight('all', 'select');
        break;
      case 'shape':
        this.setShapeType('all', 'select');
        break;
      case 'price':
        this.setPrice('all', 'select');
        break;
    }
    // console.log(items);
    // console.log('type: ' + type + " select all");
  }

  onItemDeSelect(items: any, type: string) {
    switch (type) {
      case 'metal':
        this.setMetalType(items.item_text, 'delete');
        break;
      case 'weight':
        this.setWeight(items.item_text, 'delete');
        break;
      case 'shape':
        this.setShapeType(items.item_text, 'delete');
        break;
      case 'price':
        this.setPrice(items.item_text, 'delete');
        break;
    }
    // console.log(items);
    // console.log('type: ' + type);
  }

  onItemDeSelectAll(items: any, type: string) {
    switch (type) {
      case 'metal':
        this.setMetalType('clear', 'select');
        break;
      case 'weight':
        this.setWeight('clear', 'select');
        break;
      case 'shape':
        this.setShapeType('clear', 'select');
        break;
      case 'price':
        this.setPrice('clear', 'select');
        break;
    }
    // console.log(items);
    // console.log('type: ' + type + " deselect all");
  }

  setPrice(object, option) {
    this.selected_page = 1;

    switch (object) {
      case "Up to $5,000":
        if (option == 'select') { this.selected_price.push("5000|") }
        else if (option == 'delete') {
          let filtered = this.selected_price.filter(price => price != "5000|");
          this.selected_price = filtered;
        }
        break;
      case "$5,000-$10,000":
        if (option == 'select') { this.selected_price.push("5000-10000") }
        else if (option == 'delete') {
          let filtered = this.selected_price.filter(price => price != "5000-10000");
          this.selected_price = filtered;
        }
        break;
      case "$10,000-$25,000":
        if (option == 'select') { this.selected_price.push("10000-25000") }
        else if (option == 'delete') {
          let filtered = this.selected_price.filter(price => price != "10000-25000");
          this.selected_price = filtered;
        }
        break;
      case "$25,000-$50,000":
        if (option == 'select') { this.selected_price.push("25000-50000") }
        else if (option == 'delete') {
          let filtered = this.selected_price.filter(price => price != "25000-50000");
          this.selected_price = filtered;
        }
        break;
      case "$50,000+":
        if (option == 'select') { this.selected_price.push("|50000") }
        else if (option == 'delete') {
          let filtered = this.selected_price.filter(price => price != "|50000");
          this.selected_price = filtered;
        }
        break;
      case "all":
        this.selected_price.push('5000|', '5000-10000', '10000-25000', '25000-50000', '|50000')
        break;
      case "clear":
        this.selected_price = [];
        break;
      default:
    }

    this.getData();
  }

  setMetalType(object, option) {
    this.selected_page = 1;

    switch (object) {
      case "18K White Gold":
        if (option == 'select') { this.selected_metal_type.push("white") }
        else if (option == 'delete') {
          let filtered = this.selected_metal_type.filter(metal => metal != "white");
          this.selected_metal_type = filtered;
        }
        break;
      case "18K Yellow Gold":
        if (option == 'select') { this.selected_metal_type.push("yellow") }
        else if (option == 'delete') {
          let filtered = this.selected_metal_type.filter(metal => metal != "yellow");
          this.selected_metal_type = filtered;
        }
        break;
      case "18K Rose Gold":
        if (option == 'select') { this.selected_metal_type.push("rose") }
        else if (option == 'delete') {
          let filtered = this.selected_metal_type.filter(metal => metal != "rose");
          this.selected_metal_type = filtered;
        }
        break;
      case "Platinum":
        if (option == 'select') { this.selected_metal_type.push("platinum") }
        else if (option == 'delete') {
          let filtered = this.selected_metal_type.filter(metal => metal != "platinum");
          this.selected_metal_type = filtered;
        }
        break;
      case "all":
        this.selected_metal_type.push('white', 'yellow', 'rose', 'platinum')
        break;
      case "clear":
        this.selected_metal_type = [];
        break;
      default:
    }


    this.getData();
  }

  setWeight(object, option) {
    this.selected_page = 1;
    switch (object) {
      case "0.01-0.50 Ct.":
        if (option == 'select') { this.selected_weight.push('0.50|') }
        else if (option == 'delete') {
          let filtered = this.selected_weight.filter(weight => weight != '0.50|');
          this.selected_weight = filtered;
        }
        break;
      case "0.50-1.00 Ct.":
        if (option == 'select') { this.selected_weight.push('0.50-1.00') }
        else if (option == 'delete') {
          let filtered = this.selected_weight.filter(weight => weight != '0.50-1.00');
          this.selected_weight = filtered;
        }
        break;
      case "1.00-2.00 Ct.":
        if (option == 'select') { this.selected_weight.push('1.00-2.00') }
        else if (option == 'delete') {
          let filtered = this.selected_weight.filter(weight => weight != '1.00-2.00');
          this.selected_weight = filtered;
        }
        break;
      case "2.00-5.00 Ct.":
        if (option == 'select') { this.selected_weight.push('2.00-5.00') }
        else if (option == 'delete') {
          let filtered = this.selected_weight.filter(weight => weight != '2.00-5.00');
          this.selected_weight = filtered;
        }
        break;
      case "5.00+ Ct.":
        if (option == 'select') { this.selected_weight.push('|5.00') }
        else if (option == 'delete') {
          let filtered = this.selected_weight.filter(weight => weight != '|5.00');
          this.selected_weight = filtered;
        }
        break;
      case "all":
        this.selected_weight.push('0.50|', '0.50-1.00', '1.00-2.00', '2.00-5.00', '|5.00')
        break;
      case "clear":
        this.selected_weight = [];
        break;
      default:
    }


    this.getData();
  }

  setShapeType(object, option) {
    this.selected_page = 1;
    if (option == 'select') {
      switch (object) {
        case 'all':
          this.selected_shape.push('cushion', 'radiant', 'round', 'pear', 'emerald', 'oval', 'heart', 'marquise', 'asscher', 'princess');
          break;
        case 'clear':
          this.selected_shape = [];
          break;
        default:
          this.selected_shape.push(object);
          break;
      }
    }
    else if (option == 'delete') {
      let filtered = this.selected_shape.filter(shape => shape != object);
      this.selected_shape = filtered;
    }

    // console.log(this.selected_shape)

    this.getData();
  }

  pushItems(value) {
    let item_images_arr: string[] = [];
    this.item = {
      id: null,
      sku: null,
      type: null,
      color: null,
      weight: null,
      price: null,
      sale_price: null,
      price_status: null,
      discount: null,
      image: null,
      title: null,
      j_type: null,
      metal_type: null,
      // metal_color:null,
      item_metal_color: null,
      url: null,
      images_arr: null
    };
    this.items = [];

    for (let [itemKey, val] of Object.entries(value)) {
      for (let [key, value] of Object.entries(val)) {
        switch (key) {
          case 'id':
            this.item.id = value;
            break;
          case 'sku':
            this.item.sku = value;
            break;
          case 'type':
            this.item.type = value;
            break;
          case 'color':
            this.item.color = value;
            break;
          case 'weight':
            this.item.weight = value;
            break;
          case 'price':
            this.item.price = value;
            break;
          case 'sale_price':
            this.item.sale_price = value;
            break;
          case 'price_status':
            this.item.price_status = value;
            break;
          case 'discount':
            this.item.discount = value;
            break;
          case 'image':
            this.item.image = value;
            break;
          case 'title':
            this.item.title = value;
            break;
          case 'j_type':
            this.item.j_type = value;
            break;
          case 'metal_type':
            this.item.metal_type = value;
            break;
          case 'metal_color':
            this.item.item_metal_color = value;
            break;
          case 'url':
            this.item.url = value;
            break;
          case 'images_arr':
            item_images_arr = value;
            break;

        }
        // console.table(this.item)
        // console.log(item_images_arr)

      }
      item_images_arr.unshift(String(this.item.image))
      this.items.push({
        id: this.item.id, sku: String(this.item.sku), type: String(this.item.type), color: String(this.item.color),
        weight: String(this.item.weight), price: String(this.item.price), sale_price: String(this.item.sale_price),
        price_status: String(this.item.price_status), discount: String(this.item.discount), image: String(this.item.image),
        title: String(this.item.title), j_type: String(this.item.j_type), metal_type: String(this.item.metal_type),
        item_metal_color: String(this.item.item_metal_color), url: String(this.item.url), images_arr: item_images_arr
      })

    }

    // console.error(this.items.length + ' items')
    // console.log(this.items);
    this.spinner.hide();
  }

  getData() {
    this.spinner.show();
    this.api.getCatalogue(this.selected_type, this.sort_by, this.selected_metal_type, this.selected_shape, this.selected_weight, this.selected_price, this.selected_page).subscribe(ele => {
      // console.error(ele);
      this.page_data = {
        total: String(ele.total),
        num_pages: String(ele.num_pages),
        page: String(ele.page),
        per_page: String(ele.per_page),
        sort_by: String(ele.sort_by)
      }


      for (let [key, value] of Object.entries(ele)) {
        if (key == "items") {
          this.pushItems(value);
        }
      }
      // console.log(this.page_data);
    })
  }

  page(change) {
    switch (change) {
      case 'next':
        this.selected_page = Number(this.page_data.page) + 1;
        break;
      case 'prev':
        this.selected_page = Number(this.page_data.page) - 1;
        break;
      case 'last':
        this.selected_page = Number(this.page_data.num_pages);
        break;
      case 'first':
        this.selected_page = 1;
        break;
    }
    // console.log("page change: " + change + " page #" + this.selected_page)
    window.scrollTo(0, 0);
    this.getData();
  }



  ngOnInit(): void {

    this.nbMenuService.onItemClick()
      .pipe(
        map(({ item: { title } }) => title),
      )
      .subscribe(title => this.sortBy(title));

    this.activeRoute.params.subscribe(params => {
      this.selected_type = params.type;
    })

    if (!this.selected_type) {
      this.selected_type = "rings,earrings,bracelets,necklaces"
    }
    this.getData();
  }
}


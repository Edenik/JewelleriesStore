export class Item {
    id:number;
    sku:string;
    type:string;
    color:string;
    weight:string;
    price:string;
    sale_price:string;
    price_status:string;
    discount:string;
    image:string;
    title:string;
    j_type:string;
    metal_type:string;
    // metal_color:string;
    item_metal_color?:string;
    url?:string;
    images_arr:string[];
    current_item?:string[];
}


export class FullItem {
    current_item:string[];
    certs:string;
    color:string;
    discount:string;
    id:number;
    image:string;
    images_arr:string[];
    j_center_total_weight:string;
    j_metal_weight:string;
    j_side_total_weight:string;
    j_type:string;
    long_desc:string;
    metal_color:string;
    metal_type:string;
    name:string;
    price:string;
    price_status:string;
    sale_price:string;
    short_desc:string;
    sku:string;
    title:string;
    type:string;
    weight:string;
    dateAdded?:Date;
}

export class MinimalItem{
    id:number;
    sku:string;
    name:string;
    price:string;
    image:string;
}

export class Like{
    type:string;
    user:string;
}

export class cartItem{
    id:number;
    dateAdded:Date;
}
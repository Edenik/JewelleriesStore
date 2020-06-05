import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from './page';
import { Item } from './item';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getCatalogue(type, sortby,metal_type, shape, weight, price, page):Observable<Page> {
    // console.log(`Req URL: ${this.url}?j_type=${type}&sort_by=${sortby}&j_metal_type=${metal_type}&shape=${shape}&weight=${weight}&price=${price}&page=${page}`)
    return this.http.get<Page>(`${environment.apiLinkWithKey}?j_type=${type}&sort_by=${sortby}&j_metal_type=${metal_type}&shape=${shape}&weight=${weight}&price=${price}&page=${page}&per_page=20`)
  }

  getItem(id):Observable<Item>{
    return this.http.get<Item>(`${environment.apiLinkWithKey}/show_item/${id}`)
  }
}

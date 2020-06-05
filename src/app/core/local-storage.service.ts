import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  
  saveObjToStorage(obj, objName) {
    localStorage.setItem(objName, JSON.stringify(obj));
  }

  getObjFromStorage(objName) {
    return JSON.parse(localStorage.getItem(objName))
  }

  removeObjFromStorage(objName) {
    localStorage.removeItem(objName);
  }
  constructor() { }
}

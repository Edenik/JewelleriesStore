import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public db:AngularFireAuthModule, public fbAuth:AngularFireAuth) { }

  getCurrentUser(){
    return new Promise<any>(
      (resolve,reject) => {
        const user = firebase.auth().onAuthStateChanged( (user) =>{
          // console.log(user)
          user? resolve(user) : resolve(null);
        })
      }
    )
  }

}

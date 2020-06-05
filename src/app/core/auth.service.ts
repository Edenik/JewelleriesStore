import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app'
import { Observable, of } from 'rxjs';
import { User } from './user';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fbAuth: AngularFireAuth) {}


  facebookLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.fbAuth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
 }

  googleLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.fbAuth.signInWithPopup(provider).then(
        data => {
          resolve(data)
        },
        err => {
          reject(err)
        }
      )
    })
  }

  googleLogout() {
    return new Promise(
      (resolve, reject) =>{
        if(firebase.auth().currentUser){
          this.fbAuth.signOut();
          resolve(true);
        }
        else{
          reject('user not found');
        }
      }
    )

  }

}



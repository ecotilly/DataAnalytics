import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(private fireauth: AngularFireAuth,
    private router: Router,
    private storage: Storage, private plt: Platform) { 
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }
 
  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    }).catch(err => {
      console.log("this.storage doesnt have token key available")
    })
  }
 
  login(email, password) {

    this.fireauth.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        if (res.user) {
          console.log(res.user);
          return this.storage.set(TOKEN_KEY, res.user.refreshToken).then(() => {
            this.authenticationState.next(true);
          });
        }
      })
      .catch(err => {
        console.log(`login failed ${err}`);
        return err.message;
      });

   
    
  }
 
  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }
}

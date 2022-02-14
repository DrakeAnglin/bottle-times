import { Injectable, NgZone } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User;
  constructor(public router: Router, public ngZone: NgZone, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      console.log(user);
      
      this.user = user;
    });
  }

  private oAuthProvider(provider: GoogleAuthProvider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then(() => this.router.navigate(['']))
      .catch(error => window.alert(error));
  }

  signinWithGoogle() {
    return this.oAuthProvider(new GoogleAuthProvider())
      .then(() => console.log('Successfully logged in!'))
      .catch(error => console.log(error));
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }
}

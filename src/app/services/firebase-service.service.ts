import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Facebook } from '@awesome-cordova-plugins/facebook/ngx';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor(
    private auth: AngularFireAuth,
    private facebook: Facebook,
    private router: Router
  ) {}

  loginFireauth(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  registerFireauth(value: any) {
    return this.auth.createUserWithEmailAndPassword(value.email, value.password);
  }

  async loginWithFacebook() {
    try {
      const fbLoginResponse = await this.facebook.login(['public_profile', 'email']);
      const credential = firebase.auth.FacebookAuthProvider.credential(fbLoginResponse.authResponse.accessToken);
      return this.auth.signInWithCredential(credential);
    } catch (error) {
      console.error('Facebook login failed', error);
      throw error;
    }
  }

  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  private AuthLogin(provider: firebase.auth.AuthProvider) {
    return this.auth.signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['/filter']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        console.error('AuthLogin Error:', error);
        window.alert(error.message);
      });
  }

  private SetUserData(user: firebase.User | null) {
    // Implement user data storage logic if needed
  }
}

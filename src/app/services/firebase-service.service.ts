import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { getDatabase, ref, set, get, update, remove } from 'firebase/database';



@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor(
    private auth: AngularFireAuth,
    private router: Router,

  ) {}

  // Sign in with email and password
  loginFireauth(email: string, password: string): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  // Register new user with email and password
  registerFireauth(value: any) {
    const fullName = `${value.firstName} ${value.lastName}`; // Store full name
    return this.auth.createUserWithEmailAndPassword(value.email, value.password)
      .then(result => {
        this.SetUserData(result.user, value.firstName, value.lastName);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.error('The email address is already in use by another account.');
          throw new Error('The email address is already in use.');
        } else {
          console.error('Registration Error:', error);
          throw error;
        }
      });
  }
  
  
  // Sign in with Facebook
  async loginWithFacebook() {
    try {
      const fbLoginResponse = await (window as any).FB.login(['public_profile', 'email']);
      const credential = firebase.auth.FacebookAuthProvider.credential(fbLoginResponse.authResponse.accessToken);
      const result = await this.auth.signInWithCredential(credential);
      this.SetUserData(result.user);
      return result;
    } catch (error) {
      console.error('Facebook login failed', error);
      throw error;
    }
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  // General login logic with provider
  private AuthLogin(provider: firebase.auth.AuthProvider) {
    return this.auth.signInWithPopup(provider)
      .then(result => {
        this.router.navigate(['/filter']);
        this.SetUserData(result.user);
      })
      .catch(error => {
        console.error('Login error:', error);
        window.alert(error.message);
      });
  }

  // Save user data in Firebase Realtime Database
  private async SetUserData(user: firebase.User | null, firstName: string = 'Anonymous', lastName: string = 'Anonymous') {
    if (user) {
      const userData = {
        uid: user.uid,
        email: user.email,
        firstName: firstName,
        lastName: lastName,
        displayName: `${firstName} ${lastName}`, // Store full name
        photoURL: user.photoURL || null,
        lastLogin: new Date().toISOString(),
      };
  
      try {
        const db = getDatabase();
        const userRef = ref(db, `users/${user.uid}`);
        await set(userRef, userData);
        console.log('User data saved successfully');
      } catch (error) {
        console.error('Error saving user data:', error);
      }
    }
  }

  // Get current user
  async getCurrentUser() {
    const user = await this.auth.currentUser;
    console.log(user);
    return user;
  }
  
  // Update user gender
  async updateUserGender(gender: string) {
    const user = await this.auth.currentUser;

    if (user) {
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`);
      
      try {
        await update(userRef, { gender: gender });
        console.log('User gender updated successfully');
      } catch (error) {
        console.error('Error updating user gender:', error);
        throw error;
      }
    } else {
      console.log('No user is signed in');
      throw new Error('User not signed in');
    }
  }

  // Fetch user profile
  async getUserProfile() {
    const user = await this.auth.currentUser;

    if (user) {
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`);

      try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.log('No user data available');
          return null;
        }
      } catch (error) {
        console.error('Error fetching user profile data:', error);
        return null;
      }
    } else {
      console.log('No user is signed in');
      return null;
    }
  }

  // Send password reset email
  resetPassword(email: string) {
    return this.auth.sendPasswordResetEmail(email)
      .then(() => {
        console.log('Password reset email sent');
      })
      .catch(error => {
        console.error('Error sending password reset email:', error);
        throw error;
      });
  }

  // Delete user data from Firebase
  async deleteUser(uid: string) {
    const db = getDatabase();
    const userRef = ref(db, `users/${uid}`);

    try {
      await remove(userRef);
      console.log('User data deleted successfully');
    } catch (error) {
      console.error('Error deleting user data:', error);
      throw error;
    }
  }
  
}

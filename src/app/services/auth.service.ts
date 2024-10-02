import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { getDatabase, ref, set } from 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
  

  ) {
    // Set Firebase persistence to local (ensures user session persistence)
    this.auth.setPersistence('local');
  }


 

  // تسجيل الدخول باستخدام البريد الإلكتروني وكلمة المرور
  loginFireauth(email: string, password: string): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  // تسجيل مستخدم جديد
  registerFireauth(value: any) {
    const fullName = `${value.firstName} ${value.lastName}`;
    
    return this.auth.createUserWithEmailAndPassword(value.email, value.password)
      .then((result) => {
        // Call SetUserData to save user info
        this.SetUserData(result.user, value.firstName, value.lastName);
      })
      .catch((error) => {
        // Handle errors based on Firebase error codes
        if (error.code === 'auth/email-already-in-use') {
          throw new Error('The email address is already in use.');
        } else {
          throw error;
        }
      });
    }



  // حفظ بيانات المستخدم في Firebase Realtime Database
  private async SetUserData(user: firebase.User | null, firstName: string = 'Anonymous', lastName: string = 'Anonymous', fProducts: string[] = []) {
    if (user) {
      const userData = {
        uid: user.uid,
        email: user.email,
        firstName: firstName,
        lastName: lastName,
        displayName: `${firstName} ${lastName}`,
        photoURL: user.photoURL || null,
        lastLogin: new Date().toISOString(),
      };

      try {
        const db = getDatabase();
        const userRef = ref(db, `users/${user.uid}`);
        await set(userRef, userData);
  
      } catch (error) {

      }
    }
  }


  // إرسال بريد إعادة تعيين كلمة المرور
  resetPassword(email: string) {
    return this.auth.sendPasswordResetEmail(email)
      .then(() => {
      })
      .catch((error) => {
        throw error;
      });
  }
}

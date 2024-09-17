import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Facebook } from '@awesome-cordova-plugins/facebook/ngx';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { getDatabase, ref, set, get, update, remove } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor(
    private auth: AngularFireAuth,
    private facebook: Facebook,
    private router: Router
  ) {}

  // تسجيل الدخول باستخدام البريد الإلكتروني وكلمة المرور
  loginFireauth(email: string, password: string): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  // تسجيل مستخدم جديد باستخدام البريد الإلكتروني وكلمة المرور
  registerFireauth(value: any) {
    const fullName = `${value.firstName} ${value.lastName}`; // تخزين الاسم الكامل
    return this.auth.createUserWithEmailAndPassword(value.email, value.password)
      .then(result => {
        this.SetUserData(result.user, value.firstName, value.lastName);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          // التعامل مع الخطأ إذا كان البريد الإلكتروني مستخدم بالفعل
          console.error('The email address is already in use by another account.');
          throw new Error('The email address is already in use.');
        } else {
          console.error('Registration Error:', error);
          throw error;
        }
      });
  }
  
  // تسجيل الدخول باستخدام Facebook
  async loginWithFacebook() {
    try {
      const fbLoginResponse = await this.facebook.login(['public_profile', 'email']);
      const credential = firebase.auth.FacebookAuthProvider.credential(fbLoginResponse.authResponse.accessToken);
      const result = await this.auth.signInWithCredential(credential);
      this.SetUserData(result.user);
      return result;
    } catch (error) {
      console.error('Facebook login failed', error);
      throw error;
    }
  }

  // تسجيل الدخول باستخدام Google
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  // منطق عام لتسجيل الدخول باستخدام موفر معين
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

  // حفظ بيانات المستخدم في Firebase Realtime Database
  private async SetUserData(user: firebase.User | null, firstName: string = 'Anonymous', lastName: string = 'Anonymous') {
    if (user) {
      const userData = {
        uid: user.uid,
        email: user.email,
        firstName: firstName,
        lastName: lastName,
        displayName: `${firstName} ${lastName}`, // حفظ الاسم الكامل
        photoURL: user.photoURL || null,
        lastLogin: new Date().toISOString()
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
  
  // تحديث الجنس (النوع الاجتماعي) للمستخدم في Firebase
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

  // استرجاع ملف المستخدم من قاعدة بيانات Firebase
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

  // إرسال بريد إلكتروني لإعادة تعيين كلمة المرور
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

  // حذف بيانات المستخدم من Firebase
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

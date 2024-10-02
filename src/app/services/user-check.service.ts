import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserCheckService {

  constructor(
    private auth: AngularFireAuth,
    private toastController: ToastController,
    private router: Router,
  ) {
    
   }

   // Check authentication state using Firebase
 async checkAuthState(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    this.auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is logged in, navigate to tab1
        this.router.navigate(['/tabs/tab1']);
        resolve(true); // Return true if the user is logged in
      } else {
        // User is not logged in, navigate to the home page
        this.router.navigate(['/home']);
        resolve(false); // Return false if the user is not logged in
      }
    }, reject);
  });
}
  // Display a toast notification
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      position: 'bottom',
      duration: 3000,
    });
    toast.present();
  }
       
}

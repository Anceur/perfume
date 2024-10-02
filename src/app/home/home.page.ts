import { Component } from '@angular/core';
import { UserCheckService } from '../services/user-check.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router'; // To handle navigation

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  loading: boolean = false; // To control the spinner visibility

  constructor(
    private authService: UserCheckService,
    private loadingController: LoadingController,
    private router: Router
  ) {
    this.checkUser();
  }

  async checkUser() {
    // Check the authentication state
    const user = await this.authService.checkAuthState();

    if (user) {
      // User is logged in, show the spinner and navigate to the dashboard or another page
      this.loading = true; // Show the spinner

      const loading = await this.loadingController.create({
        message: 'Loading your dashboard...',
        spinner: 'crescent',
        duration: 5000 // Optional timeout for the spinner
      });

      await loading.present();

      // Simulate some post-login process or navigation
      setTimeout(() => {
        this.loading = false; // Hide spinner
        loading.dismiss();
        this.router.navigate(['/tabs/tab1']); // Navigate to a different page (e.g., dashboard)
      }, 3000); // 3-second simulated delay
    }
  }
}

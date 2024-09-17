import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseServiceService } from '../services/firebase-service.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Chart, registerables } from 'chart.js'; // Import Chart.js

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userProfile: any = {}; // Adjust according to your user profile structure

  constructor(
    private router: Router,
    private profileService: FirebaseServiceService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
    this.createRadarChart(); // Initialize radar chart
  }

  loadUserProfile() {
    this.profileService.getUserProfile()
      .then(profile => {
        this.userProfile = profile || {};
      })
      .catch(error => {
        console.error('Error loading user profile:', error);
      });
  }

  createRadarChart() {
    Chart.register(...registerables); // Register Chart.js components
    
    const ctx = (document.getElementById('radarChart') as HTMLCanvasElement).getContext('2d');
    
    if (ctx) {
      new Chart(ctx, {
        type: 'radar',
        data: {
          labels: ['Citrus', 'Animalic', 'Woody', 'Green', 'Floral', 'Spicy', 'Sweet', 'Fruity'],
          datasets: [{
            label: 'Fragrance Profile',
            data: [6, 7, 5, 6, 7, 8, 6, 5], // Example data
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            r: {
              angleLines: {
                display: true
              },
              suggestedMin: 0,
              suggestedMax: 10
            }
          }
        }
      });
    }
  }

  logout() {
    this.afAuth.signOut()
      .then(() => {
        console.log('Logged out successfully');
        this.router.navigate(['/login']); // Navigate to login page or any other page
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  }

  deleteAccount() {
    this.afAuth.currentUser
      .then(user => {
        if (user) {
          // Delete user data from Firebase Realtime Database
          this.profileService.deleteUser(user.uid)
            .then(() => {
              // Delete user from Firebase Authentication
              user.delete()
                .then(() => {
                  console.log('Account deleted successfully');
                  this.router.navigate(['/login']); // Navigate to login page or any other page
                })
                .catch(error => {
                  console.error('Error deleting account:', error);
                });
            })
            .catch(error => {
              console.error('Error deleting user data:', error);
            });
        } else {
          console.log('No user is signed in');
        }
      })
      .catch(error => {
        console.error('Error fetching current user:', error);
      });
  }
}

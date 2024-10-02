import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseServiceService } from '../services/firebase-service.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Chart, registerables } from 'chart.js';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  likes?: { [key: string]: { data: number; family: string } };
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile = { firstName: '', lastName: '', email: '', gender: '' };
  radarChart: Chart | undefined;
  isEditingFirstName = false;
  isEditingLastName = false;
  isEditingEmail = false;
  isEditingGender = false;

  constructor(
    private router: Router,
    private profileService: FirebaseServiceService,
    private afAuth: AngularFireAuth
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadUserProfile(); // Load the user profile on initialization
  }

  loadUserProfile(): void {
    this.profileService.getUserProfile()
      .then(profile => {
        this.userProfile = profile || {};
        console.log('Loaded User Profile:', this.userProfile);
        this.initializeRadarChart(this.userProfile.likes);
      })
      .catch(error => {
        console.error('Error loading user profile:', error);
        // Optionally show user feedback
      });
  }

  updateProfile(): void {
    const updatedProfile = {
      firstName: this.userProfile.firstName,
      lastName: this.userProfile.lastName,
      email: this.userProfile.email,
      gendre: this.userProfile.gender
    };

    this.profileService.updateUserProfile(updatedProfile)
      .then(() => {
        console.log('User profile updated successfully');
      })
      .catch(error => {
        console.error('Error updating profile:', error);
        // Optionally show user feedback
      });
  }

  initializeRadarChart(likes: { [key: string]: { data: number, family: string } } | undefined): void {
    const ctx = document.getElementById('likesRadarChart') as HTMLCanvasElement;

    const familyMap: { [key: string]: number } = {
      "Agrumes": 0,
      "Animalique": 1,
      "Boisée": 2,
      "Doux": 3,
      "Épice": 4,
      "Florale": 5,
      "Fruite": 6,
      "Vert": 7
    };

    const dataValues = new Array(Object.keys(familyMap).length).fill(0);

    if (likes) {
      Object.values(likes).forEach(item => {
        const index = familyMap[item.family];
        if (index !== undefined) {
          dataValues[index] = item.data;
        }
      });
    }

    console.log('Processed Data Values:', dataValues);

    if (this.radarChart) {
      this.radarChart.destroy();
    }

    this.radarChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: Object.keys(familyMap),
        datasets: [{
          label: 'User Preferences',
          data: dataValues,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderColor: 'rgba(255, 255, 255, 1)',
          pointBackgroundColor: 'white',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          r: {
            grid: {
              color: 'rgba(255, 255, 255, 0.0)',
            },
            pointLabels: {
              color: 'rgba(255, 255, 255, 0.0)',
              font: {
                size: 12,
                family: 'Arial, sans-serif'
              }
            },
            angleLines: {
              color: 'rgba(255, 255, 255, 0.0)',
            },
            ticks: {
              display: false,
            },
            min: 1,
            max: 5
          }
        }
      }
    });
  }

  logout(): void {
    this.afAuth.signOut()
      .then(() => {
        console.log('Logged out successfully');
        this.router.navigate(['/home']);
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  }
  deleteAccount(): void {
    console.log('Attempting to delete account...');
    
    this.afAuth.currentUser
      .then(user => {
        if (user) {
          console.log('Current user found:', user.uid);
          
          // Delete user data first
          this.profileService.deleteUser(user.uid)
            .then(() => {
              console.log('User data deletion confirmed, now deleting authentication account...');
              
              // After deleting the data, delete the user account
              user.delete()
                .then(() => {
                  console.log('Account deleted successfully for UID:', user.uid);
                  this.router.navigate(['/home']);
                })
                .catch(error => {
                  console.error('Error deleting account for UID:', user.uid, error);
                });
            })
            .catch(error => {
              console.error('Error deleting user data for UID:', user.uid, error);
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

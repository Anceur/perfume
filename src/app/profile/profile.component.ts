import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseServiceService } from '../services/firebase-service.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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

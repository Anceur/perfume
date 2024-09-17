import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseServiceService } from '../services/firebase-service.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor(private router: Router, private profileService: FirebaseServiceService) {}

  ngOnInit(): void {}

  selectGender(gender: string) {
    this.profileService.updateUserGender(gender)
      .then(() => {
        // Navigate to different routes based on the selected gender
        if (gender === 'Femme') {
          this.router.navigate(['/filter/femme']);
        } else if (gender === 'Homme') {
          this.router.navigate(['/filter/homme']);
        } else {
          console.error('Invalid gender selection');
        }
      })
      .catch(error => {
        console.error('Error updating user gender:', error);
      });
  }
}

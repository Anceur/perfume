import { Component, OnInit } from '@angular/core';
import { FirebaseServiceService } from '../services/firebase-service.service';
import { getAuth } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  favoriteProducts: any[] = [];

  constructor(private firebaseService: FirebaseServiceService, private router: Router) { }

  ngOnInit(): void {
    this.checkUserAndGetFavorites();
  }

  async checkUserAndGetFavorites() {
    const auth = getAuth();
    const user = auth.currentUser;


    await this.getFavoriteProducts();
  }

  // Fetch favorite products and display them
  async getFavoriteProducts() {
    try {
      this.favoriteProducts = await this.firebaseService.compareFavoriteAndAllProducts();
      console.log('Favorite Products:', this.favoriteProducts);
    } catch (error) {
      console.error('Error fetching favorite products:', error);
    }
  }

  clickCard(id: string) {
    this.router.navigate(['/tabs/tab1/chaque-produi', id]);
  }
}

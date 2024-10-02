import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { getDatabase, ref, set, get, update, remove, child } from 'firebase/database';
import { getAuth } from 'firebase/auth';



@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor(
    private auth: AngularFireAuth,
    private router: Router,

  ) {}

  // Sign in with email and password
  
  // Save user data in Firebase Realtime Database
  
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
 
      } catch (error) {
        throw error;
      }
    } else {
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
 
          return null;
        }
      } catch (error) {

        return null;
      }
    } else {
  
      return null;
    }
  }

  async deleteUser(uid: string) {
    const db = getDatabase();
    const userRef = ref(db, `users/${uid}`);
  
    try {
      await remove(userRef);

    } catch (error) {

      throw error;
    }
  }
  async compareFavoriteAndAllProducts() {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (!user) {
        throw new Error('User is not authenticated');
      }
  
      const userId = user.uid;
      const db = getDatabase();
  
      // Get favorite products for the user
      const favoritesRef = ref(db, `/users/${userId}/favoriteProducts`);
      const favoritesSnapshot = await get(favoritesRef);
      const favoriteProductsData = favoritesSnapshot.exists() ? favoritesSnapshot.val() : {};
  
      // Get all products from the 'products' node
      const productsRef = ref(db, '/products');
      const productsSnapshot = await get(productsRef);
      const productsData = productsSnapshot.exists() ? productsSnapshot.val() : {};

  
      const matchingProducts: { id: string, name: string, image: string, genre: string }[] = [];
      const productMap = new Map<string, { name: string, image: string, genre: string }>();
      const seenProductIds = new Set<string>();  // Set to track product IDs
  
      // Loop through each product to compare flavors
      for (const productId in productsData) {
        if (productsData.hasOwnProperty(productId)) {
          const product = productsData[productId];
          const productTete = product['tete'];
          const productIdValue = product['id']; // Assuming 'id' is the last value to keep
          const genre = product['genre']; // Extract the genre here
  
          if (productTete) {
            // Loop through each favorite product key
            for (const favoriteKey in favoriteProductsData) {
              if (favoriteProductsData.hasOwnProperty(favoriteKey)) {
                const favoriteProduct = favoriteProductsData[favoriteKey];
                const favoriteTete = favoriteProduct['tete'];
  
                if (favoriteTete) {
                  // Loop through each flavor key in 'tete' of favorite products
                  for (const flavorKey in favoriteTete) {
                    if (favoriteTete.hasOwnProperty(flavorKey)) {
                      const favoriteFlavor = favoriteTete[flavorKey]['one'];
  
                      // Compare with the product's 'tete' flavor
                      if (productTete[flavorKey] && productTete[flavorKey]['one'] === favoriteFlavor) {
                        // Check if the product ID has been added
                        if (!seenProductIds.has(productIdValue)) {
                          // If match and not added before, add product information to productMap
                          productMap.set(productIdValue, {
                            name: product['name'],
                            image: product['image'],
                            genre: genre, // Add genre here
                          });
                          seenProductIds.add(productIdValue);  // Mark this product ID as seen
                        }
                        break; // Break the loop if a match is found to avoid duplicate entries
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
  
      // Convert Map to array of matching products
      matchingProducts.push(...Array.from(productMap.entries()).map(([id, { name, image, genre }]) => ({ id, name, image, genre })));

      return matchingProducts;
  
    } catch (error) {

      throw error;
    }
  }
  
  async updateUserProfile(updatedProfile: any) {
    const user = await this.auth.currentUser;
    
    if (user) {
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`);
      try {
        await update(userRef, updatedProfile);

      } catch (error) {

        throw error;
      }
    } else {
      throw new Error('User not signed in');
    }
  }
  
}
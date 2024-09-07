import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from "firebase/database";
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  notes: any = [];
  brands: any = [];
  products: any = [];
  showResults: boolean = false;
  showSpinner: boolean = true;

  constructor(private router: Router) { }

 

  showItems() {
    this.showResults = false;
  }

  handleInput(event: any) {
    const key: string = event.target.value;
    const lowerCaseKey = key.toLowerCase();

    if (lowerCaseKey.length > 0) {
      const database = getDatabase();
      const productsRef = ref(database, 'products');

      onValue(productsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const filteredProducts = Object.values(data).filter((product: any) =>
            product.name.toLowerCase().startsWith(lowerCaseKey)
          );
          this.products = filteredProducts;
          this.showResults = true; // Show results when there's input
        } else {
          this.products = [];
          this.showResults = false;
        }
      });
    } else {
      this.clearSearch(); // Hide results when search input is cleared
    }
  }

  clearSearch() {
    const database = getDatabase();
    const productsRef = ref(database, 'products');
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.products = Object.values(data);
      } else {
        this.products = [];
      }
    });
    this.showResults = false; 
  }

  ngOnInit(): void {
    const app = initializeApp(environment.firebaseConfig);
  
    
    const database = getDatabase();

    // Fetch products
    const productsRef = ref(database, 'products');
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      this.products = Object.values(data);
      this.checkDataLoaded(); // Check if all data is loaded
    });

    // Fetch brands
    const brandsRef = ref(database, 'brands');
    onValue(brandsRef, (snapshot) => {
      const data = snapshot.val();
      this.brands = Object.values(data);
      this.checkDataLoaded(); // Check if all data is loaded
    });

   
    const notesRef = ref(database, 'notes');
    onValue(notesRef, (snapshot) => {
      const data = snapshot.val();
      this.notes = Object.values(data);
      this.checkDataLoaded(); // Check if all data is loaded
    });
  }

  // Method to check if all data is loaded and hide spinner
  checkDataLoaded() {
    // Check if all data arrays have been populated
    if (this.products && this.brands && this.notes) {
      // All data has been loaded, hide the spinner
      this.showSpinner = false;
    }
  }

  clickCard(id: string) {
    this.router.navigate(['/tabs/tab1/chaque-produi', id])
  }

  click(nom: string) {
    this.router.navigate(['/tabs/tab1/chanel', nom])
  }

  clicknote(name: string) {
    this.router.navigate(['/tabs/tab1/chaque-note', name])
  }
}

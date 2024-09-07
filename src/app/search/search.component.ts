import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref } from 'firebase/database';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  showResults: boolean = false;
  products: any[] = [];

  constructor(private router: Router) { }

  // Show items when input changes
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
          this.showResults = true;  // Show results
        } else {
          this.products = [];
          this.showResults = false;
        }
      });
    } else {
      this.clearSearch();  // Hide results when input is empty
    }
  }

  // Clear the search results
  clearSearch() {
    this.products = [];
    this.showResults = false;
  }

  // Handle click to navigate to product details
  clickCard(id: string) {
    this.router.navigate(['/tabs/tab1/chaque-produi', id]);
  }

  ngOnInit(): void {
    const app = initializeApp(environment.firebaseConfig);
  
    
    const database = getDatabase();

    // Fetch products
    const productsRef = ref(database, 'products');
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      this.products = Object.values(data);
    });
  }
}

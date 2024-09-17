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
  brandsGroupedByLetter: { letter: string, brands: any[] }[] = [];

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
          this.showResults = true;
        } else {
          this.products = [];
          this.showResults = false;
        }
      });
    } else {
      this.clearSearch();
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

  // Handle click on brand
  clickBrand(nom: string) {
    this.router.navigate(['/tabs/tab1/chanel', nom]);
  }

  ngOnInit(): void {
    const app = initializeApp(environment.firebaseConfig);
    const database = getDatabase();

    // Fetch and group brands by first letter
    const brandsRef = ref(database, 'brands');
    onValue(brandsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const brands = Object.values(data).sort((a: any, b: any) => a.nom.localeCompare(b.nom));

        // Group brands by the first letter of their name
        this.brandsGroupedByLetter = this.groupBrandsByLetter(brands);
      }
    });

    // Fetch products
    const productsRef = ref(database, 'products');
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      this.products = Object.values(data);
    });
  }

  // Group brands by the first letter of their name
  groupBrandsByLetter(brands: any[]): { letter: string, brands: any[] }[] {
    const grouped = brands.reduce((acc, brand) => {
      const firstLetter = brand.nom[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(brand);
      return acc;
    }, {});

    return Object.keys(grouped).sort().map(letter => ({
      letter,
      brands: grouped[letter]
    }));
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref } from 'firebase/database';
import { environment } from 'src/environments/environment';

interface Product {
  id: number;
  name: string;
  genre: string;
  coeur: string;
  image: string;  // URL or path to the product's image
  [key: string]: any;  // This allows additional properties that might exist on the product
}

@Component({
  selector: 'app-homme',
  templateUrl: './homme.component.html',
  styleUrls: ['./homme.component.scss']
})
export class HommeComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTermEntered: boolean = false;
  selectedProducts: Product[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    const app = initializeApp(environment.firebaseConfig);
    const database = getDatabase();

    // Fetch products from Firebase
    const productsRef = ref(database, 'products');
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      this.products = Object.values(data) as Product[];
    });
  }

  searchProduct(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.searchTermEntered = true;

    if (searchTerm && searchTerm.trim() !== '') {
      this.filteredProducts = this.products.filter((product: Product) =>
        product.genre === 'homme' &&
        (product.name.toLowerCase().includes(searchTerm) ||
         (product.coeur && typeof product.coeur === 'string' && product.coeur.toLowerCase().includes(searchTerm)))
      );
    } else {
      this.filteredProducts = [];
    }
  }

  toggleProductSelection(product: Product) {
    const index = this.selectedProducts.findIndex(p => p.id === product.id);

    if (index > -1) {
      this.selectedProducts.splice(index, 1);
    } else {
      this.selectedProducts.push(product);
    }
  }

  isSelected(product: Product): boolean {
    return this.selectedProducts.some(p => p.id === product.id);
  }

  confirmSelection() {
    if (this.selectedProducts.length > 0) {
      this.router.navigate(['/filter/choisir-note'], { state: { products: this.selectedProducts } });
    }
  }
}

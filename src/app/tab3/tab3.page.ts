import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Router, RouterModule } from '@angular/router';
import { getDatabase, onValue, ref } from "firebase/database";
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
register();
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  brands:any = [];
  showResults: boolean | undefined;
  
  ngOnInit(): void {
    const app = initializeApp(environment.firebaseConfig);
    const database = getDatabase();
    const starCountRef = ref(database, 'brands',);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      this.brands = Object.values(data); 
        })
      }
  constructor(private router:Router) {}
  click(nom:string){
    this.router.navigate(['/tabs/tab1/chanel',nom])
  }
 
  showItems() {
    this.showResults = false;
  }
  
  handleInput(event: any) {
    const key: string = event.target.value;
    const lowerCaseKey = key.toLowerCase();
  
    if (lowerCaseKey.length > 0) {
      const database = getDatabase();
      const productsRef = ref(database, 'brands');
  
      onValue(productsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const filteredProducts = Object.values(data).filter((brand: any) =>
          brand.nom.toLowerCase().startsWith(lowerCaseKey)
          );
          this.brands = filteredProducts;
          this.showResults = true; // Show results when there's input
        } else {
          this.brands = [];
          this.showResults = false;
        }
      });
    } else {
      const database = getDatabase();
      const productsRef = ref(database, 'brands');
      onValue(productsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.brands = Object.values(data); 
        } else {
          this.brands = [];
        }
      });
      this.showResults = false; // Hide results when search input is cleared
    }
  }

    
}
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref } from "firebase/database";
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  products:any = [];
  showResults: boolean | undefined;

  constructor(private router:Router) {

  }
  showItems() {
    this.showResults = false;
  }
  
  handleInput(event: any) {
    const key: string = event.target.value;
    const lowerCaseKey = key.toLowerCase();
  
    if (lowerCaseKey.length > 0) {
      const datab = getDatabase();
      const productsRef = ref(datab, 'products');
  
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
      this.showResults = false; // Hide results when search input is cleared
    }
  }
  

  ngOnInit(): void {
    const app = initializeApp(environment.firebaseConfig);
   

    const database = getDatabase();
    const starCountRef = ref(database, 'products',);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      this.products = Object.values(data); 
        })
      }
  clickCard(id:string){
    this.router.navigate(['/tabs/tab1/chaque-produi',id])
  }


}
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



  // products: any[] =[
  //   {"id": 1,
  //   "name" : "Bleu De Chanel",
  //   "image": "/assets/pr/3.png",
  // },
  // {"id": 2,
  // "name" : "Chanel n°05",
  // "image": "/assets/pr/6.png",
  // },
  // {"id": 3,
  // "name" : "Chanel Egoïste",
  // "image": "/assets/pr/5.png",
  // },
  // {"id": 4,
  // "name" : "Chanel Chance",
  // "image": "/assets/pr/4.png",
  // },
  // {"id": 5,
  // "name" : "ChanelEau Tendre",
  // "image": "/assets/pr/1.png",
  // },
  // {"id": 6,
  // "name" : "Dior Sauvage",
  // "image": "/assets/pr/2.png",
  // },
  // {"id": 7,
  // "name" : "Dior Bois D'argent",
  // "image": "/assets/pr/7.png",
  // },
  // {"id": 8,
  // "name" : "Dior AmbreNuit",
  // "image": "/assets/pr/8.png",
  // },
  // {"id": 9,
  // "name" : "Armani withYou",
  // "image": "/assets/pr/10.png",
  // },
  // {"id": 10,
  // "name" : "Dior Fahrenheit",
  // "image": "/assets/pr/9.png",
  // },
  // {"id": 11,
  // "name" : "Yves Saint Libre",
  // "image": "/assets/pr/Untitled design (2).png",
  // },
  // {"id": 12,
  // "name" : "bleu electrique",
  // "image": "/assets/pr/28.png",
  // },
  // {"id": 13,
  // "name" : "Armani amber",
  // "image": "/assets/pr/47.png",
  // },
  // {"id": 14,
  // "name" : "Creed aventus",
  // "image": "/assets/pr/11.png",
  // },
  // {"id": 15,
  // "name" : "Creed himalaya",
  // "image": "/assets/pr/12.png",
  // },
  // {"id": 16,
  // "name" : " Creed water",
  // "image": "/assets/pr/13.png",
  // },
  // {"id": 17,
  // "name" : "Nishane hacivat",
  // "image": "/assets/pr/14.png",
  // },
  // {"id": 18,
  // "name" : "Nishane shem",
  // "image": "/assets/pr/15.png",
  // },
  // {"id": 19,
  // "name" : "Soleil neige",
  // "image": "/assets/pr/16.png",
  // },
  // {"id": 20,
  // "name" : "Black orchid",
  // "image": "/assets/pr/19.png",
  // },
  // {"id": 21,
  // "name" : "Beau du jour",
  // "image": "/assets/pr/20.png",
  // },
  // {"id": 22,
  // "name" : "Fucking fabulous",
  // "image": "/assets/pr/Untitled design (3).png",
  // },
  // {"id": 23,
  // "name" : "Lost cherry",
  // "image": "/assets/pr/18.png",
  // },
  // // {"id": 24,
  // // "name" : "/assets/pr/Bitter peach",
  // // "image": "",
  // // },
  // {"id": 25,
  // "name" : "Metalique",
  // "image": "/assets/pr/21.png",
  // },
  // {"id": 26,
  // "name" : "The one",
  // "image": "/assets/pr/22.png",
  // },
  // {"id": 27,
  // "name" : "Royal night",
  // "image": "/assets/pr/23.png",
  // },
  // // {"id": 28,
  // // "name" : "Initio greatness",
  // // "image": "/assets/pr/INITIO_Oud_for_Greatness_eau_de_parfum_90ml-removebg-preview.jpg",
  // // },
  // // {"id": 29,
  // // "name" : "Initio happiness",
  // // "image": "/assets/pr/Initio_-_.jpg",
  // // },
  // {"id": 30,
  // "name" : "Molecules 02",
  // "image": "/assets/pr/24.png",
  // },
  // {"id": 31,
  // "name" : "Versace eros",
  // "image": "/assets/pr/25.png",
  // },
  // {"id": 32,
  // "name" : "Versace dylan blue",
  // "image": "/assets/pr/26.png",
  // },
  // {"id": 33,
  // "name" : "Versace crystal noir",
  // "image": "/assets/pr/27.png",
  // },
  // {"id": 34,
  // "name" : "Prada l'homme",
  // "image": "/assets/pr/29.png",
  // },
  // {"id": 35,
  // "name" : "Prada luna",
  // "image": "/assets/pr/30.png",
  // },
  // {"id": 36,
  // "name" : "Terre d'hermes",
  // "image": "/assets/pr/31.png",
  
  // },
  // {"id": 37,
  // "name" : "Hermes monsieur li",
  // "image": "/assets/pr/32.png",
  // },
  // {"id": 38,
  // "name" : "Hermes le toit",
  // "image": "/assets/pr/33.png",
  // },
  // {"id": 39,
  // "name" : "Hermes mediterranien",
  // "image": "/assets/pr/34.png",
  // },
  // {"id": 40,
  // "name" : "hermes la lagune",
  // "image": "/assets/pr/35.png",
  // },
  // {"id": 41,
  // "name" : "Voyage d'hermes",
  // "image": "/assets/pr/36.png",
  // },
  // {"id": 42,
  // "name" : "Nautica voyage",
  // "image": "/assets/pr/37.png",
  // },
  // {"id": 43,
  // "name" : "Afternoon swim",
  // "image": "/assets/pr/38.png",
  // },
  // {"id": 44,
  // "name" : "Lv l'immensité",
  // "image": "/assets/pr/39.png",
  // },
  // {"id": 45,
  // "name" : "Lv la route",
  // "image": "/assets/pr/40.png",
  // },
  // {"id": 46,
  // "name" : "Lv ombre nomade",
  // "image": "/assets/pr/42.png",
  // },
  // {"id": 46,
  // "name" : "Lv imagination",
  // "image": "/assets/pr/41.png",
  // },
  // {"id": 47,
  // "name" : "Mfk baccarat rouge",
  // "image": "/assets/pr/43.png",
  // },
  // {"id": 48,
  // "name" : "Mfk petit matin",
  // "image": "/assets/pr/44.png",
  // },
  
  
  // ]
}

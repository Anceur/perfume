import { Component, OnInit } from '@angular/core';
import { object } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref } from "firebase/database";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chanel',
  templateUrl: './chanel.page.html',
  styleUrls: ['./chanel.page.scss'],
})
export class ChanelPage implements OnInit {
nom!:string|null;
product: any;
brands :any = [];
  

  constructor(private router : Router ,private route : ActivatedRoute) { }
  
  ngOnInit() {
    const app = initializeApp(environment.firebaseConfig);
    this.route.paramMap.subscribe(r => {
      this.nom = r.get('nom')
      
  }
  )
  const database = getDatabase();
  const starCountRef = ref(database, 'brands',);

  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    this.brands = Object.values(data).map((p:any) => ({
      ...p,
      products : p.products?Object.values(p.products):[]

    }) 
    )
    console.log(this.brands);
})

  }
  get brand() {
    console.log( this.brands.find((p:any)=> p.nom == this.nom));
    return this.brands.find((p:any)=> p.nom == this.nom)
  }
  clickCard(id:string){
    this.router.navigate(['/tabs/tab1/chaque-produi',id])
    }


  }


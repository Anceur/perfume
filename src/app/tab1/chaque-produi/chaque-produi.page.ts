import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { getDatabase, onValue, ref } from "firebase/database";
import { object } from '@angular/fire/database';
import { Location } from '@angular/common';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
register();


@Component({
  selector: 'app-chaque-produi',
  templateUrl: './chaque-produi.page.html',
  styleUrls: ['./chaque-produi.page.scss'],
})
export class ChaqueProduiPage implements OnInit {

 

id!: string | null;
note: any;
products:any = [];
notes:any = [];
productNote :any=[];
tete:any = [];




  constructor(private router : Router ,private route : ActivatedRoute, private location: Location) { }
  
  goBack() {
    this.location.back();
  }
  ngOnInit() {
    const app = initializeApp(environment.firebaseConfig);
    this.route.paramMap.subscribe(r => {
      this.id = r.get('id')
    })
    const database = getDatabase();
  const starCountRef = ref(database, 'products',);

  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    this.products = Object.values(data).map((p:any) => ({
      ...p,
      tete : p.tete?Object.values(p.tete):[],
      fond : p.fond?Object.values(p.fond):[],
      coeur :p.coeur?Object.values(p.coeur):[],

    }) 
    )
    console.log(this.notes);
  
  });

 
  }
  ClickCard(id:string){
    this.router.navigate(['/tabs/tab1/chaque-produi',id])
  }
  get product() {
 return this.products.find((p: { id: string | null; }) => p.id == this.id)
  }

}
function getProductKeys() {
  throw new Error('Function not implemented.');
}


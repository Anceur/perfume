import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getDatabase, onValue, ref } from "firebase/database";
import { Location } from '@angular/common';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chaque-note',
  templateUrl: './chaque-note.page.html',
  styleUrls: ['./chaque-note.page.scss'],
})
export class ChaqueNotePage implements OnInit {
name!:string|null;
newsItem: any;
notes :any = [];
  





  constructor(private router : Router ,private route : ActivatedRoute, private location: Location) { }

  ngOnInit() {
    const app = initializeApp(environment.firebaseConfig);
    this.route.paramMap.subscribe(r => {
      this.name= r.get('name')
  })
  const database = getDatabase();
const starCountRef = ref(database, 'notes',);
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  this.notes = Object.values(data).map((p:any) => ({
    ...p,
    products : p.products?Object.values(p.products):[]

  }) 
  )
  console.log(this.notes);
})

}
  get note() {
    return this.notes.find((p:any) => p.name == this.name)
     
  }
  clickCard(id:string){
    this.router.navigate(['/tabs/tab1/chaque-produi',id])
    }
    goBack() {
      this.location.back();
    }
  
}

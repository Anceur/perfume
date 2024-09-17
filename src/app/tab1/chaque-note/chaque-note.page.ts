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
  
//   news:any[]=[

//     {
//       "name":"Ambre",
//       "notes":"/assets/note/8.png",
//       "notess":[
//         {
//           "name" : "Chanel Egoïste",
//           "image": "/assets/pr/5.png",
//         },
//       ]
//     },
//     {
//     "name":"Pamplemousse",
//     "notes":"/assets/note/27.png",
//     "notess":[
//       {
//         "name" : "Bleu De Chanel",
//         "image": "/assets/pr/3.png",
//       },
//     ]

//   },
//   {
//     "name":"vanille",
//     "notes":"/assets/note/2.png",
//     "notess":[
    
//       {
//         "name" : "Chanel n°05",
//         "image": "/assets/pr/6.png",
//       },
//     ]
//   },
//   {
//     "name":"Gingembre",
//     "notes":"/assets/note/18.png",
//     "notess":[
//       {
//         "name" : "Bleu De Chanel",
//         "image": "/assets/pr/3.png",
//       },
//     ]

//   },
//   {
//     "name":"Citron",
//     "notes":"/assets/note/19.png",
//     "notess":[
//       {
//         "name" : "Bleu De Chanel",
//         "image": "/assets/pr/3.png",
//       },
//     ]
//   },
//   {
//     "name":"Menthe",
//     "notes":"/assets/note/21.png",
//     "notess":[
//       {
//         "name" : "Bleu De Chanel",
//         "image": "/assets/pr/3.png",
//       },
//     ]
//   },
//   {
//     "name":"Poivre rose",
//     "notes":"/assets/note/6.png",
//     "notess":[
      
//         {
//           "name" : "The one",
//           "image": "/assets/pr/22.png",
//           },
      
//     ]
 
//   },
//   {
//     "name":"Noix de muscade",
//     "notes":"/assets/note/23.png"
//   },
//   {
//     "name":"Jasmin",
//     "notes":"/assets/note/22.png"
//   },
//   {
//     "name":"Encens",
//     "notes":"/assets/note/20.png"
//   },
//   {
//     "name":"Vétiver",
//     "notes":"/assets/note/17.png",
//     "notess":[
    
//       {
// "name" : "Chanel n°05",
// "image": "/assets/pr/6.png",
// },
//     ]
//   },
//   {
//     "name":"Cèdre",
//     "notes":"/assets/note/24.png"
//   },
//   {
//     "name":"Bois de santal",
//     "notes":"/assets/note/10.png",
//     "notess":[
//       {
//         "name" : "Bleu De Chanel",
//         "image": "/assets/pr/3.png",
//       },
//       {
// "name" : "Chanel n°05",
// "image": "/assets/pr/6.png",
// },
// {
//   "name" : "Chanel Egoïste",
//   "image": "/assets/pr/5.png",
// },
//     ]
//   },
//   {
//     "name":"Patchouli",
//     "notes":"/assets/note/4.png",
//     "notess":[
      
//       {
//         "name" : "Dior Fahrenheit",
//         "image": "/assets/pr/9.png",
//         },
//         {
//         "name" : "Dior Bois D'argent",
//         "image": "/assets/pr/7.png",
//         },
//         {
//         "name" : "Dior Ambre Nuit",
//         "image": "/assets/pr/8.png",
//         },
//   ]
//   },
//   {
//     "name":"tabac",
//     "notes":"/assets/note/9.png",
//     "notess":[
//       {
//         "name" : "Chanel Egoïste",
//         "image": "/assets/pr/5.png",
//       },
//     ]
//   }
//   ]
}

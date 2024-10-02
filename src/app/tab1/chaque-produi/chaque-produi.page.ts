import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { getDatabase, onValue, ref, set, remove } from "firebase/database";
import { Location } from '@angular/common';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { trigger, transition, style, animate } from '@angular/animations';
import { getAuth } from 'firebase/auth';

register();

@Component({
  selector: 'app-chaque-produi',
  templateUrl: './chaque-produi.page.html',
  styleUrls: ['./chaque-produi.page.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('500ms ease', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class ChaqueProduiPage implements OnInit {

  id!: string | null;
  note: any;
  products: any = [];
  notes: any = [];
  productNote: any = [];
  tete: any = [];
  liked: boolean = false; // Track the like status
  skeletonShow: boolean = true; // Skeleton is shown initially
  imageLoaded: boolean = false; // Track image load state

  ngOnInit() {
    const app = initializeApp(environment.firebaseConfig);
    this.route.paramMap.subscribe(r => {
      this.id = r.get('id');
    });

    const database = getDatabase();
    const starCountRef = ref(database, 'products');

    // Simulate loading data after 1 second
    setTimeout(() => {
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        this.products = Object.values(data).map((p: any) => ({
          ...p,
          tete: p.tete ? Object.values(p.tete) : [],
          fond: p.fond ? Object.values(p.fond) : [],
          coeur: p.coeur ? Object.values(p.coeur) : [],
        }));
        console.log(this.notes);
        this.checkImageLoad();
        this.checkIfLiked(this.product.id);
      });
    }, 1000); // 1000ms delay before fetching the data
  }

  checkIfLiked(productId: string) {
    const auth = getAuth();
    const user = auth.currentUser; // Get the currently signed-in user
  
    if (user) {
      const userId = user.uid; // Get the user's ID
      const database = getDatabase(); // Get a reference to the database
      const likeRef = ref(database, `users/${userId}/favorite/${productId}`); // Define the path to the user's favorite product
  
      // Use onValue to listen for changes at the like reference
      onValue(likeRef, (snapshot) => {
        this.liked = snapshot.exists(); // Check if the product is liked (exists in the database)
        console.log(`Product ${productId} liked status for user ${userId}:`, this.liked);
      }, (error) => {
        console.error('Error checking like status:', error); // Handle errors
      });
    } else {
      console.log('No user is currently signed in.'); // If no user is signed in
    }
  }
 
  toggleLike(productId: string) {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (user) {
      const userId = user.uid; // Get current user's ID
      const database = getDatabase(); // Get a reference to the database
      const likeRef = ref(database, `users/${userId}/favorite/${productId}`); // Define the path for the favorite product
  
      if (this.liked) {
        // If already liked, unlike the product
        remove(likeRef)
          .then(() => {
            this.liked = false; // Update local liked state
            console.log(`Product ${productId} unliked by user ${userId}`);
          })
          .catch(error => {
            console.error('Error unliking the product:', error);
          });
      } else {
        // If not liked, like the product
        set(likeRef, true) // Use set to add the product to favorites
          .then(() => {
            this.liked = true; // Update local liked state
            console.log(`Product ${productId} liked by user ${userId}`);
          })
          .catch(error => {
            console.error('Error liking the product:', error);
          });
      }
    } else {
      console.log('No user is currently signed in.');
    }
  }

  constructor(private router: Router, private route: ActivatedRoute, private location: Location,
    
  ) {}

  goBack() {
    this.location.back();
  }


  checkImageLoad() {
    // Check if the product image is loaded
    const imgElement = new Image();
    imgElement.src = this.product?.imageback; // Replace with the correct property for your image

    imgElement.onload = () => {
      this.imageLoaded = true;
      setTimeout(() => {
        this.skeletonShow = false;
      }, 500); // Wait for 1 second before hiding the skeleton
    };
  }

  ClickCard(id: string) {
    this.router.navigate(['/tabs/tab1/chaque-produi', id]);
  }

  get product() {
    return this.products.find((p: { id: string | null; }) => p.id == this.id);
  } 
}
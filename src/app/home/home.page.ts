import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper'; // Import Swiper

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;
  progressValue: number = 0; // Progress value for the ion-progress-bar
  swiper: any; // Swiper instance

  // Define the progress values for each slide
  progressValues = [0.2, 0.5, 1]; 

  pages = [
    {
      title: "Vous cherchez un parfum ?",
      image: "assets/home/1.png",
      description: "Partagez qui vous êtes, ce que vous aimez ou les goûts de la personne à qui vous souhaitez offrir un parfum",
      style:""
    },
    {
      title: "Une sélection d'experts",
      image: "assets/home/2.png",
      description: "Découvrez les parfums qui vous conviennent le mieux parmi plusieurs milliers et sélectionnez ceux que vous souhaitez tester en magasin.",
      style:""
    },
    {
      title: "Où que tu sois",
      image: "assets/home/3.png",
      description: "Des grandes chaînes aux petits détaillants de niche, choisissez votre détaillant de parfums à proximité et trouvez la perle rare !",
      style:""
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // Initial setup if needed
  }

  ngAfterViewInit() {
    this.swiper = this.swiperContainer.nativeElement.swiper;
    if (this.swiper) {
      this.swiper.on('slideChange', () => {
        this.updateProgress();
      });
    }
    this.updateProgress(); // Initial progress update
  }

  // Updates the ion-progress-bar based on the swiper's current index
  updateProgress() {
    if (this.swiper) {
      const currentIndex = this.swiper.activeIndex; // Get the current active slide index
      this.progressValue = this.progressValues[currentIndex] || 0; // Set progress based on the current slide
    }
  }
}

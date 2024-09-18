import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;
  progressValue: number = 0;
  swiper: any;
  activeIndex: number = 0; // Track the active slide index

  pages = [
    {
      title: "Esque Vous cherchez un parfum ?",
      image: "assets/home/1.png",
      description: "Partagez qui vous êtes, ce que vous aimez ou les goûts de la personne à qui vous souhaitez offrir un parfum",
    },
    {
      title: "Un panel d'experts triés sur le volet",
      image: "assets/home/2.png",
      description: "Découvrez les parfums qui vous conviennent le mieux parmi plusieurs milliers et sélectionnez ceux que vous souhaitez tester en magasin.",
    },
    {
      title: "Tu es au bon endroit pour les parfums.",
      image: "assets/home/3.png",
      description: "Des grandes chaînes aux petits détaillants de niche, choisissez votre détaillant de parfums à proximité et trouvez la perle rare !",
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.swiper = this.swiperContainer.nativeElement.swiper;
    
    // Initialize Swiper events
    this.swiper.on('slideChange', () => {
      this.activeIndex = this.swiper.activeIndex; // Update the active index
      this.updateProgress();
    });

    // Initial progress update
    this.updateProgress();
  }

  updateProgress() {
    if (this.swiper) {
      const currentIndex = this.swiper.activeIndex;
      this.activeIndex = currentIndex; // Update the active index
      this.progressValue = (currentIndex + 1) / this.pages.length; // Update progress value
    }
  }
}
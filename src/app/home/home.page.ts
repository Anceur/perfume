import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  @ViewChild('swiperContainer', { static: true }) swiperContainer!: ElementRef;
  progressValue: number = 0;
  private scrollInterval: any;
  private pagesCount: number = 0;
  private manualScroll: boolean = false;
  private lastScrollTime: number = 0;
  private scrollDelay: number = 3000;
  private manualScrollDelay: number = 5000;

  autoPlayConfig = {
    delay: 3000,
    disableOnInteraction: false
  };

  pages = [
    {
      title: "Vous cherchez un parfum ?",
      image: "assets/home/1.webp",
      description: "Partagez qui vous êtes, ce que vous aimez ou les goûts de la personne à qui vous souhaitez offrir un parfum"
    },
    {
      title: "Une sélection d'experts",
      image: "assets/home/2.webp",
      description: "Découvrez les parfums qui vous conviennent le mieux parmi plusieurs milliers et sélectionnez ceux que vous souhaitez tester en magasin."
    },
    {
      title: "Où que tu sois",
      image: "assets/home/3.webp",
      description: "Des grandes chaînes aux petits détaillants de niche, choisissez votre détaillant de parfums à proximité et trouvez la perle rare !"
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions.bind(this));
    this.startAutoScroll();
  }

  updateDimensions() {
    const swiper = this.swiperContainer.nativeElement.swiper;
    this.pagesCount = this.pages.length;
    this.updateProgress();
  }

  updateProgress() {
    const swiper = this.swiperContainer.nativeElement.swiper;
    const currentIndex = swiper.activeIndex;
    this.progressValue = (currentIndex + 1) / this.pagesCount;
  }

  startAutoScroll() {
    this.scrollInterval = setInterval(() => {
      if (this.manualScroll && Date.now() - this.lastScrollTime < this.manualScrollDelay) {
        return;
      }
      this.manualScroll = false;

      const swiper = this.swiperContainer.nativeElement.swiper;
      swiper.slideNext();
      this.updateProgress();
    }, this.scrollDelay);
  }

  onSlideChange() {
    this.updateProgress();
    this.manualScroll = true;
    this.lastScrollTime = Date.now();
  }

  ngOnDestroy() {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
    }
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }
}

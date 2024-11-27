import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element';

@Component({
  selector: 'app-carousal-features-1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousal-features-1.component.html',
  styleUrls: ['./carousal-features-1.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarousalFeatures1Component implements AfterViewInit {
  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;

  swiperConfig = {
    slidesPerView: 1,
    speed: 500,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    centeredSlides: true,
    pagination: {
      clickable: true,
      dynamicBullets: true,
    },
    effect: 'cube',
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
  };

  slides = [
    {
      backgroundImage: '../../../../../assets/esports1.jpg',
      title: 'Rewards and Prizes',
      description: 'Earn coins and rewards through gameplay. Withdraw daily at 1 AM',
      icons: [
        '../../../../../assets/cat3.jpg',
        '../../../../../assets/cat2.jpg',
        '../../../../../assets/cat.jpg'
      ]
    },
    {
      backgroundImage: '../../../../../assets/controller2.jpg',
      title: 'Hello slide 2 and Prizes',
      description: 'Earn coins and rewards through gameplay. Withdraw daily at 1 AM',
      icons: [
        '../../../../../assets/cat3.jpg',
        '../../../../../assets/cat2.jpg',
        '../../../../../assets/cat.jpg'
      ]
    },
    {
      backgroundImage: '../../../../../assets/controller3.jpg',
      title: 'Rewards and Prizes',
      description: 'Earn coins and rewards through gameplay. Withdraw daily at 1 AM',
      icons: [
        '../../../../../assets/cat3.jpg',
        '../../../../../assets/cat2.jpg',
        '../../../../../assets/cat.jpg'
      ]
    }
  ];

  ngAfterViewInit() {
    register();
    Object.assign(this.swiperContainer.nativeElement, this.swiperConfig);
    this.swiperContainer.nativeElement.initialize();
  }

  pauseAutoplay() {
    this.swiperContainer.nativeElement.swiper.autoplay.stop();
  }

  resumeAutoplay() {
    this.swiperContainer.nativeElement.swiper.autoplay.start();
  }
}

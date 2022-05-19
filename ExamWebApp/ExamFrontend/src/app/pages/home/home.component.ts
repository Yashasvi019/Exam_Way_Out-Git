import { Component, OnInit, ViewChild } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imageObject: Array<object> = [{
    image: 'assets/image1.jpg',
    //thumbImage: 'assets/img/slider/1_min.jpeg',
    alt: 'alt of image',
    title: 'title of image'
  }, 
  {
    image: 'assets/image2.jpg', // Support base64 image
    // thumbImage: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
    title: 'Image title', //Optional: You can use this key if want to show image with title
    alt: 'Image alt', //Optional: You can use this key if want to show image with alt
    order: 1 //Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
  },
  {
  image: 'assets/image3.jpg', // Support base64 image
  // thumbImage: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
  title: 'Image title', //Optional: You can use this key if want to show image with title
  alt: 'Image alt', //Optional: You can use this key if want to show image with alt
  order: 1 //Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
  }
];


  isLoggedIn=false;

  constructor(public login:LoginService) { }

  ngOnInit(): void {
    this.login.logout();
    this.isLoggedIn=false;
  }

  @ViewChild('nav')
  slider!: NgImageSliderComponent;

  prevImageClick() {
    this.slider.prev();
}

nextImageClick() {
    this.slider.next();
}

}

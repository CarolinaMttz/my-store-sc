import { Component } from '@angular/core';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //imgParent = 'https://i.pinimg.com/736x/99/0a/95/990a95804d42ae98dcefcf5a7632b846.jpg';
  imgParent = '';
  showImg = true;


  onLoaded(img: String){
    console.log('log padre ', img);
  }

  toggleImg(){
    this.showImg = !this.showImg;
  }

}

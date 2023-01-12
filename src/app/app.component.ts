import { Component } from '@angular/core';
//import { Product } from './models/product.model'
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //imgParent = 'https://i.pinimg.com/736x/99/0a/95/990a95804d42ae98dcefcf5a7632b846.jpg';
  imgParent = '';
  showImg = true;

  constructor(
    private authService: AuthService,
    private userService: UsersService
  ){}

  // eslint-disable-next-line @typescript-eslint/ban-types
  onLoaded(img: String){
    console.log('log padre ', img);
  }

  toggleImg(){
    this.showImg = !this.showImg;
  }

  createUser(){
    this.userService.create({
      name: 'Carolina',
      email: 'carolina@email.com',
      password: '112233'
    })
    .subscribe( rta => {
      console.log(rta);
    });
  }

  login(){
    this.authService.login('carolina@email.com', '112233'  )
        .subscribe( rta => {
          console.log(rta);
        });
  }




}

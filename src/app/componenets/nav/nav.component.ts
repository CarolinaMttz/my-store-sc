//import { Product } from './../../models/product.model';
import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  //token = '';
  profile: User | null = null;

  constructor(
    private storeService: StoreService,
    private authService: AuthService
  ){
  }

  ngOnInit(): void {
      this.storeService.myCar$.subscribe( products => {
        this.counter = products.length;
      } )
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }

  login(){
    /*
    this.authService.login('carolina@email.com', '112233')
      .subscribe(rta => {
         this.token = rta.access_token;
         console.log(this.token);
         this.getProfile();
      });
      */

      this.authService.loginAndGet('carolina@email.com', '112233')
      .subscribe(user => {
        this.profile = user;
        //console.log("login ", user);
        //this.token = '..';
      });
  }

  /*getProfile(){
    this.authService.profile(this.token)
        .subscribe( rta => {
          this.profile = rta;
          console.log('getprofile ', rta);
        });
  }*/

}

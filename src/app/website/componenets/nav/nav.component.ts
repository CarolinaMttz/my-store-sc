//import { Product } from './../../models/product.model';
import { Component, OnInit } from '@angular/core';
//import { StoreService } from '../../services/store.service';
import { StoreService } from '../../../services/store.service';
import { AuthService } from '../../../services/auth.service';
import { CategoriesService } from '../../../services/categories.service';
import { User } from '../../../models/user.model';
import { Category } from './../../../models/category.model';
import { Router } from '@angular/router';

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
  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private router: Router
  ){
  }

  ngOnInit(): void {
    this.storeService.myCar$.subscribe(products => {
      this.counter = products.length;
    });
    this.getAllCategories();
    this.authService.user$
    .subscribe(data => {
      this.profile = data;
    })
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }


  login() {
    this.authService.loginAndGet('carolina@email.com', '112233')
    .subscribe(() => {
      this.router.navigate(['/profile']);
    });
  }

  /*getProfile(){
    this.authService.profile(this.token)
        .subscribe( rta => {
          this.profile = rta;
          console.log('getprofile ', rta);
        });
  }*/

  getAllCategories(){
    this.categoriesService.getAll()
    .subscribe(data => {
      this.categories = data;
    });
  }

  logout(){
    this.authService.logOut();
    this.profile = null;
    this.router.navigate(['/home']);
  }

}

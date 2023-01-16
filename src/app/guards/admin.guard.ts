import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { TokenService } from './../services/token.service';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private authService: AuthService,
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return true;

    return this.authService.user$ //user$ es el estdo global del usuario
                .pipe(
                  map( user => {
                    if( user?.role == 'admin' ){ //¿El usuario logueado es un admin?
                        return true;
                      }else{
                        this.router.navigate(['/home']);
                        return false;
                      }
                  })
                )
  }

}

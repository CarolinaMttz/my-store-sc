import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environments';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { switchMap, tap } from 'rxjs/operators';
import { TokenService } from './../services/token.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private apiUrl = `${environment.API_URL}/api/auth`;
  //private apiUrl = 'https://young-sands-07814.herokuapp.com/api/auth';
  private apiUrl ='https://damp-spire-59848.herokuapp.com/api/auth';
  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable(); //user$ es el estdo global del usuario


  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password})
    .pipe(
      tap(response => this.tokenService.saveToken(response.access_token)),
    );
  }

  profile(){
    return this.http.get<User>(`${this.apiUrl}/profile`)
    .pipe(
      tap(user => this.user.next(user)) // Estado del login
    );
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password)
    .pipe(
      switchMap(() => this.profile()),
    )
  }

  logOut(){
    this.tokenService.removeToken();
  }

}

import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environments';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private apiUrl = `${environment.API_URL}/api/auth`;
  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/auth';

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string){
    return this.http.post<Auth>( `${this.apiUrl}/login`,{email, password} );
  }

  profile(token: string){
    // const header = new HttpHeaders();
    // header.set('Authorization',`Bearer ${token}`);
    return this.http.get<User>( `${this.apiUrl}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        //'Content-type': 'application/json'
      }
    });
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password)
    .pipe(
      switchMap(rta => this.profile(rta.access_token)),
    )
  }

}

import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService  {

  public authToken: any;
  public user: any;

  constructor(private http: Http) { }

  registerUser(user) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    return this.http.post('users/register', user, { headers: header })
      .map(res => res.json());
      
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    
    return this.http.post('users/authenticate', user,{headers: headers})
      .map(res => res.json());
  }
  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
   
    return this.http.get('users/profile',{headers: headers})
      .map(res => res.json());
  } 

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  loggedIn(){
    return tokenNotExpired("id_token",this.authToken);
  }
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }


}

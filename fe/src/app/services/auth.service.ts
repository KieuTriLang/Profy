import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  HOST_API = environment.host_api;

  authenticatedState = new BehaviorSubject<boolean>(false);
  authenticatedState$ = this.authenticatedState.asObservable();

  constructor(
    private http:HttpClient
  ) { }


  signIn(username:string,password:string):Observable<any>{
    return this.http.post(`${this.HOST_API}/api/auth/sign-in`,null,{
      params:{
        "username": username,
        "password": password
      }
    })
  }
  signUp(username:string,password:string):Observable<any>{
    return this.http.post(`${this.HOST_API}/api/auth/sign-up`,null,{
      params: {
        "username":username,
        "password":password
      }
    })
  }
  logout():Observable<any>{
    return this.http.post(`${this.HOST_API}/api/auth/log-out`,null);
  }
}

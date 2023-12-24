import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Info } from '../interfaces/Info';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  HOST_API = environment.host_api;

  constructor(private http:HttpClient) { }

  getAll(params:HttpParams):Observable<any>{
    return this.http.get(`${this.HOST_API}/api/card`,{params:params});
  }
  get(cardId:string):Observable<any>{
    return this.http.get(`${this.HOST_API}/api/card/${cardId}`);
  }
  create(data : Info[]):Observable<any>{
    return this.http.post(`${this.HOST_API}/api/card`,data);
  }

  update(cardId:string,data:Info[]):Observable<any>{
    return this.http.put(`${this.HOST_API}/api/card/${cardId}`,data);
  }

  delete(cardId:string):Observable<any>{
    return this.http.delete(`${this.HOST_API}/api/card/${cardId}`);
  }
}

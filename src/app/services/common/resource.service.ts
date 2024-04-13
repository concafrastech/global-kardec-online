import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  apiURL: string = "http://localhost:8080/"

  constructor(private http: HttpClient) { }
  get(): Observable<any>{
    return this.http.get(`${this.apiURL}gk/conteudo/uuid`)
  }
  post(body:string){
    return this.http.post(`${this.apiURL}`, body)
  }
  put(data:string){
    return this.http.put(`${this.apiURL}`, data)
  }
  delete(route:string){
    return this.http.delete(`${this.apiURL + route}`)
  }
}

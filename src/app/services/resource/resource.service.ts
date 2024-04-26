
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resource } from '../../models/resource';


@Injectable({
    providedIn: 'root'
})
export class ResourceService {
    private apiUrl: String;

    constructor(private _http: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    getResource(uuid: string): Observable<any> {
        let headers = { 'Content-Type': 'application/json', }

        return this._http.get(`${this.apiUrl}/gk/conteudo/${uuid}`, { headers })
    }

    deleteResource(uuid: string): Observable<any> {
        let headers = { 'Content-Type': 'application/json', }

        return this._http.delete(`${this.apiUrl}/gk/conteudo/${uuid}`, { headers })
    }

    postResource(resource: Resource): Observable<any> {
        let headers = { 'Content-Type': 'application/json', }

        return this._http.post(`${this.apiUrl}/gk/conteudo/`, resource, { headers })
    }

    updateResource(resource: Resource): Observable<any> {
        let headers = { 'Content-Type': 'application/json', }
        return this._http.put(`${this.apiUrl}/gk/conteudo/`, resource, { headers })
    }

}

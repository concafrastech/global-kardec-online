import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SpiritCenterService {
    private apiUrl: string;

    constructor(private _http: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    /**
     * Função que busca TODOS os centros espíritas e retonar em um array.
     * @returns Observable<any>
     */
    getAllSpiritsCenter(): Observable<any> {
        let headers = {
            'Content-Type': 'application/json',
        };

        return this._http.get(`${this.apiUrl}/gk/centroespirita`, { headers });
    }
}

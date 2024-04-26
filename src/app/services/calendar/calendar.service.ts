import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CalendarService {
    private apiUrl: string;

    constructor(private _http: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    // TODO: Desenvolver função de retorno de todos os calendários no back primeiro.
    getAllCalendars() {}

    /**
     * Função responsável por retornar um calendário de acordo com o UUID passado.
     *
     * @param uuid - String
     *
     * @return Object JSON
     */
    getCalendar(uuid: string): Observable<any> {
        let headers = {
            'Content-Type': 'application/json',
        };

        return this._http.get(`${this.apiUrl}/gk/calendario/${uuid}`, {
            headers,
        });
    }
}

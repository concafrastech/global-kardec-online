import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Calendar } from '../../models/calendar';

@Injectable({
    providedIn: 'root',
})
export class CalendarService {
    apiUrl: string;

    constructor(private _http: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    getCalendarBySpiritCenter(uuidSpiritCenter: string): Observable<any> {
        let headers = {
            'Content-Type': 'application/json',
        };

        return this._http.get(
            `${this.apiUrl}/gk/calendario/porCentro/${uuidSpiritCenter}`,
            { headers },
        );
    }

    /**
     * Função responsável por retornar um calendário de acordo com o UUID passado.
     * @param uuid - String
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

    /**
     * Função responsável pela criação de um calendário.
     * @param calendar
     * @returns Observable<any>
     */
    createCalendar(calendar: Calendar): Observable<any> {
        let headers = {
            'Content-Type': 'application/json',
        };

        return this._http.post(`${this.apiUrl}/gk/calendario/`, calendar, {
            headers,
        });
    }

    deleteCalendar(uuid: string | undefined): Observable<any> {
        let headers = {
            'Content-Type': 'application/json',
        };

        return this._http.delete(`${this.apiUrl}/gk/calendario/${uuid}`, {
            headers,
        });
    }
}

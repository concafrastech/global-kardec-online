import {environment} from '../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {Frequency} from '../../models/frequency';


@Injectable({
    providedIn: 'root'
})
export class FrequencyService {
    private apiUrl: string;

    constructor(private httpClient: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    /**
     *
     * @param classUuid
     */
    getFrequencyByClass(classUuid: string): Observable<any> {
        return this.httpClient.get<any>(`${this.apiUrl}/gk/frequencia/porTurma/${classUuid}`)
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
     *
     * @param registryUuid
     */
    getFrequencyByRegistry(registryUuid: string): Observable<any> {
        return this.httpClient.get<any>(`${this.apiUrl}/gk/frequencia/porMatricula/${registryUuid}`)
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
     *
     * @param calendarUuid
     * @param classDate
     */
    getFrequencyByCalendar(calendarUuid: string, classDate: string): Observable<any> {
        return this.httpClient.get<any>(`${this.apiUrl}/gk/frequencia/porCalendario/${calendarUuid}/${classDate}`)
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
     *
     * @param frequency
     */
    updateResource(frequency: Frequency): Observable<any> {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        return this.httpClient.put<any>(`${this.apiUrl}/gk/frequencia/`, frequency, {headers})
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
     * Lida com erros retornados pelas requisições HTTP.
     *
     * @param error O objeto de erro retornado pela requisição HTTP.
     * @returns Um Observable com uma mensagem de erro.
     */
    private handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Ocorreu um erro do lado do cliente ou da rede. Trate-o de acordo.
            errorMessage = 'Ocorreu um erro: ' + error.error.message;
        } else {
            // O backend retornou um código de resposta não bem-sucedido.
            // O corpo da resposta pode conter pistas sobre o que deu errado.
            errorMessage = `O backend retornou o código ${error.status}: ${error.message}`;
        }
        console.error(errorMessage); // Registre o erro no console
        return throwError(errorMessage); // Relance o erro como um observable para manipulação adequada de erros
    }
}

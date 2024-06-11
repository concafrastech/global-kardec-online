import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class UtilsService {
    private apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    /**
     * Busca institutos a partir da API do backend.
     *
     * @returns Observable<any> contendo um array de objetos de instituto.
     */
    getInstitutes(): Observable<any> {
        const headers = { 'Content-Type': 'application/json' };

        return this.http
            .get<any>(`${this.apiUrl}/gk/auxiliares/obterInstitutos`, {
                headers,
            })
            .pipe(
                map((response) => response.data || response), // Lidar com respostas da API em potencial com ou sem uma propriedade "data"
                catchError(this.handleError),
            );
    }

    /**
     * Busca idiomas a partir da API do backend.
     *
     * @returns Observable<any> contendo um array de objetos de idioma.
     */
    getLanguages(): Observable<any> {
        const headers = { 'Content-Type': 'application/json' };

        return this.http
            .get<any>(`${this.apiUrl}/gk/auxiliares/obterIdioma`, { headers })
            .pipe(
                map((response) => response.data || response), // Lidar com respostas da API em potencial com ou sem uma propriedade "data"
                catchError(this.handleError),
            );
    }

    getRegisterLink(): Observable<any> {
        const headers = { 'Content-Type': 'application/json' };

        return this.http.get<any>(`${this.apiUrl}/gk/auxiliares/obterVinculoMatricula`, { headers })
            .pipe(
                map(response => response.data || response), // Lidar com respostas da API em potencial com ou sem uma propriedade "data"
                catchError(this.handleError)
            );
    }

    getResourceTypeByClass(): Observable<any> {
        const headers = { 'Content-Type': 'application/json' };

        return this.http.get<any>(`${this.apiUrl}/gk/auxiliares/obterTipoRecursoAula`, { headers })
            .pipe(
                map(response => response.data || response), // Lidar com respostas da API em potencial com ou sem uma propriedade "data"
                catchError(this.handleError)
            );
    }
    getCalendarDayTypes(): Observable<any> {
        const headers = { 'Content-Type': 'application/json' };

        return this.http.get<any>(`${this.apiUrl}/gk/auxiliares/obterTipoDiaCalendario`, { headers })
            .pipe(
                map(response => response.data || response), // Lidar com respostas da API em potencial com ou sem uma propriedade "data"
                catchError(this.handleError)
            );
    }
    getCourseType(): Observable<any> {
        const headers = { 'Content-Type': 'application/json' };

        return this.http.get<any>(`${this.apiUrl}/gk/auxiliares/obterTipoCurso`, { headers })
            .pipe(
                map(response => response.data || response), // Lidar com respostas da API em potencial com ou sem uma propriedade "data"
                catchError(this.handleError)
            );
    }
    getRegisterLog(): Observable<any> {
        const headers = { 'Content-Type': 'application/json' };

        return this.http.get<any>(`${this.apiUrl}/gk/auxiliares/obterSituacaoMatricula`, { headers })
            .pipe(
                map(response => response.data || response), // Lidar com respostas da API em potencial com ou sem uma propriedade "data"
                catchError(this.handleError)
            );
    }
    getCountry(): Observable<any> {
        const headers = { 'Content-Type': 'application/json' };

        return this.http.get<any>(`${this.apiUrl}/gk/auxiliares/obterPais`, { headers })
            .pipe(
                map(response => response.data || response), // Lidar com respostas da API em potencial com ou sem uma propriedade "data"
                catchError(this.handleError)
            );
    }
    getCountryByName(name: string): Observable<any> {
        const headers = { 'Content-Type': 'application/json' };

        return this.http.get<any>(`${this.apiUrl}/gk/auxiliares/obterPais/${name}`, { headers })
            .pipe(
                map(response => response.data || response), // Lidar com respostas da API em potencial com ou sem uma propriedade "data"
                catchError(this.handleError)
            );
    }
    getStatesByCountryId(countryId: string): Observable<any> {
        const headers = { 'Content-Type': 'application/json' };

        return this.http.get<any>(`${this.apiUrl}/gk/auxiliares/obterPais/${countryId}`, { headers })
            .pipe(
                map(response => response.data || response), // Lidar com respostas da API em potencial com ou sem uma propriedade "data"
                catchError(this.handleError)
            );
    }
    getStatesByCountryIdName(countryId: string, name: string): Observable<any> {
        const headers = { 'Content-Type': 'application/json' };

        return this.http.get<any>(`${this.apiUrl}/gk/auxiliares/obterPais/${countryId}/${name}`, { headers })
            .pipe(
                map(response => response.data || response), // Lidar com respostas da API em potencial com ou sem uma propriedade "data"
                catchError(this.handleError)
            );
    }
    getCityByName(name: string): Observable<any>{
        const headers = { 'Content-Type': 'application/json' };

        return this.http.get<any>(`${this.apiUrl}/gk/auxiliares/obterCidade/${name}`, { headers })
            .pipe(
                map(response => response.data || response), // Lidar com respostas da API em potencial com ou sem uma propriedade "data"
                catchError(this.handleError)
            );
    }
    getCitiesByStates(state: string): Observable<any>{
        const headers = { 'Content-Type': 'application/json' };

        return this.http.get<any>(`${this.apiUrl}/gk/auxiliares/obterCidade/porEstado/${state}`, { headers })
            .pipe(
                map(response => response.data || response), // Lidar com respostas da API em potencial com ou sem uma propriedade "data"
                catchError(this.handleError)
            );
    }
    getSubjectsCategoryList(): Observable<any>{
        const headers = { 'Content-Type': 'application/json' };

        return this.http.get<any>(`${this.apiUrl}/gk/auxiliares/obterCategoriaMateria`, { headers })
            .pipe(
                map(response => response.data || response), // Lidar com respostas da API em potencial com ou sem uma propriedade "data"
                catchError(this.handleError)
            );
    }
    /**
     * Busca os tipos de dias do Calendário.
     *
     * @returns Observable<any> contendo um array dos tipos de dias do calendário.
     */
    getTypeDaysCalendar(): Observable<any> {
        const headers = { 'Content-Type': 'application/json' };

        return this.http.get(
            `${this.apiUrl}/gk/auxiliares/obterTipoDiaCalendario`,
            { headers },
        );
    }

    /**
     * Lida com erros retornados pelas requisições HTTP.
     *
     * @param error O objeto de erro retornado pela requisição HTTP.
     * @returns Um Observable com uma mensagem de erro.
     */
    private handleError(error: any) {
        let errorMessage;
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

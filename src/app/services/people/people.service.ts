import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { People } from '../../models/people';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PeopleService {
    private apiUrl: string;

    constructor(private _http: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    /**
     * Atualiza os dados de uma pessoa
     * @param personInfo Objeto contendo as informações da pessoa a serem atualizadas
     * @returns Um Observable com a resposta da requisição
     */
    update(personInfo: People): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http
            .put<any>(`${this.apiUrl}/gk/pessoa`, personInfo, { headers })
            .pipe(catchError(this.handleError));
    }

    /**
     * Insere um novo cadastro de pessoa
     * @param personInfo Objeto contendo as informações da pessoa a serem cadastradas
     * @returns Um Observable com a resposta da requisição
     */
    post(personInfo: People): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http
            .post<any>(`${this.apiUrl}/gk/pessoa`, personInfo, { headers })
            .pipe(catchError(this.handleError));
    }

    /**
     * Obtém os dados de uma pessoa pelo UUID
     * @param uuid Identificador único da pessoa
     * @returns Um Observable com os dados da pessoa
     */
    get(uuid: string): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http
            .get<any>(`${this.apiUrl}/gk/pessoa/${uuid}`, { headers })
            .pipe(catchError(this.handleError));
    }

    /**
     * Deleta uma pessoa pelo UUID
     * @param uuid Identificador único da pessoa
     * @returns Um Observable com a resposta da requisição
     */
    delete(uuid: string): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http
            .delete<any>(`${this.apiUrl}/gk/pessoa/${uuid}`, { headers })
            .pipe(catchError(this.handleError));
    }

    /**
     * Obtém os dados de uma pessoa pelo nome
     * @param name Nome da pessoa
     * @returns Um Observable com os dados da pessoa
     */
    getByName(name: string): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http
            .get<any>(`${this.apiUrl}/gk/pessoa/porNome/${name}`, { headers })
            .pipe(catchError(this.handleError));
    }

    /**
     * Obtém os dados de uma pessoa pelo email ou telefone
     * @param data Email ou telefone da pessoa
     * @returns Um Observable com os dados da pessoa
     */
    getByEmailOrPhone(data: string): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http
            .get<any>(`${this.apiUrl}/gk/pessoa/porEmailOuTelefone/${data}`, {
                headers,
            })
            .pipe(catchError(this.handleError));
    }

    /**
     * Obtém as pessoas associadas a um centro pelo UUID do centro
     * @param uuid Identificador único do centro
     * @returns Um Observable com os dados das pessoas
     */
    getBySpiritCenter(uuid: string): Observable<any> {
        // Corrigido o nome do método para `getByCenter`
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http
            .get<any>(`${this.apiUrl}/gk/pessoa/porCentro/${uuid}`, { headers })
            .pipe(catchError(this.handleError));
    }

    /**
     * Lida com erros retornados pelas requisições HTTP.
     *
     * @param error O objeto de erro retornado pela requisição HTTP.
     * @returns Um Observable com uma mensagem de erro.
     */
    private handleError(error: any): Observable<never> {
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

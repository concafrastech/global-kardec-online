import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Class} from "../../models/class";
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ClassService {
    private apiUrl: String;

    constructor(private _http: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    /**
     * Retorna a atualização de uma turma
     * @param classInfo
     */
    put(classInfo: Class): Observable<any> {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        return this._http.put<any>(
            `${this.apiUrl}/gk/turma'`,
            classInfo,
            {headers}
        ).pipe(
            catchError(this.handleError)
        );
    }

    /**
     *
     * @param classInfo
     */
    post(classInfo: Class): Observable<any> {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        return this._http.post<any>(
            `${this.apiUrl}/gk/turma'`,
            classInfo,
            {headers}
        ).pipe(
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

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
// Models
import {Class} from "../../models/class";
import {ClassLot} from "../../models/classLot";

@Injectable({
    providedIn: 'root',
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
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this._http
            .put<any>(`${this.apiUrl}/gk/turma'`, classInfo, { headers })
            .pipe(catchError(this.handleError));
    }

    /**
     * Permite o cadastramento de uma nova turma
     *
     * @param classInfo
     */
    post(classInfo: Class): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this._http
            .post<any>(`${this.apiUrl}/gk/turma'`, classInfo, { headers })
            .pipe(catchError(this.handleError));
    }

    /**
     * Cadastro de turmas em lote
     *
     * @param classLot
     */
    postLote(classLot: ClassLot): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this._http
            .post<any>(`${this.apiUrl}/gk/turma'`, classLot, { headers })
            .pipe(catchError(this.handleError));
    }

    /**
     * Reabrir uma turma a partir do uuid da turma
     *
     * @param uuid id único da turma
     */
    patchReopen(uuid: string): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this._http
            .patch<any>(`${this.apiUrl}/gk/turma/reabrir/${uuid}'`, { headers })
            .pipe(catchError(this.handleError));
    }

    /**
     * Encerrar uma turma a partir do uuid da turma
     *
     * @param uuid id único da turma
     */
    patchClose(uuid: string): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this._http
            .patch<any>(`${this.apiUrl}/gk/turma/encerrar/${uuid}'`, {
                headers,
            })
            .pipe(catchError(this.handleError));
    }

    /**
     * Retorna uma turma por uuid
     *
     * @param uuid O UUID da turma a ser retornada.
     * @return Um Observable que emite o objeto da turma correspondente ao UUID fornecido.
     */
    get(uuid: string | undefined): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this._http
            .get<any>(`${this.apiUrl}/gk/turma/${uuid}'`, { headers })
            .pipe(catchError(this.handleError));
    }

    /**
     * permite a exclusão por um uuid
     *
     * @param uuid
     * @return
     */
    delete(uuid: string): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this._http
            .delete<any>(`${this.apiUrl}/gk/turma/${uuid}'`, { headers })
            .pipe(catchError(this.handleError));
    }

    /**
     * Retorna todas as turmas por centro
     *
     * @param uuid O UUID do centro a ser retornado.
     * @return Um Observable que emite o objeto da turma correspondente ao UUID fornecido.
     */
    getBySpiritCenter(uuid: string | undefined): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http
            .get<any>(
                `${this.apiUrl}/gk/turma/porCentro/${uuid}`,
                { headers },
            )
            .pipe(catchError(this.handleError));
    }

    /**
     * Retorna as turmas associadas a um centro e curso específicos.
     *
     * @param uuidCentro O UUID do centro.
     * @param nomeCurso O nome do curso.
     * @return Um Observable que emite a lista de turmas correspondentes ao centro e curso fornecidos.
     */
    getPerCentroPorCurso(
        uuidCentro: string,
        nomeCurso: string,
    ): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this._http
            .get<any>(
                `${this.apiUrl}/gk/turma/porCentro/${uuidCentro}/${nomeCurso}'`,
                { headers },
            )
            .pipe(catchError(this.handleError));
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

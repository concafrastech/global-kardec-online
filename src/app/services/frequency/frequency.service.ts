import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Frequency } from '../../models/frequency';

@Injectable({
    providedIn: 'root'
})
export class FrequencyService {
    private apiUrl: string;

    constructor(private httpClient: HttpClient) {
        // Define a URL da API a partir das configurações de ambiente
        this.apiUrl = environment.apiUrl;
    }

    /**
     * Obtém a frequência dos alunos para uma determinada turma.
     *
     * @param classUuid O UUID da turma para a qual a frequência será obtida.
     * @returns Um Observable contendo os dados de frequência da turma.
     */
    getFrequencyByClass(classUuid: string): Observable<any> {
        return this.httpClient.get<any>(`${this.apiUrl}/gk/frequencia/porTurma/${classUuid}`)
            .pipe(
                catchError(this.handleError) // Lidar com erros retornados pelas requisições HTTP
            );
    }

    /**
     * Obtém a frequência dos alunos para uma determinada matrícula.
     *
     * @param registryUuid O UUID da matrícula para a qual a frequência será obtida.
     * @returns Um Observable contendo os dados de frequência da matrícula.
     */
    getFrequencyByRegistry(registryUuid: string): Observable<any> {
        return this.httpClient.get<any>(`${this.apiUrl}/gk/frequencia/porMatricula/${registryUuid}`)
            .pipe(
                catchError(this.handleError) // Lidar com erros retornados pelas requisições HTTP
            );
    }

    /**
     * Obtém a frequência dos alunos para um determinado calendário e data de aula.
     *
     * @param calendarUuid O UUID do calendário para o qual a frequência será obtida.
     * @param classDate A data da aula para a qual a frequência será obtida.
     * @returns Um Observable contendo os dados de frequência do calendário na data especificada.
     */
    getFrequencyByCalendar(calendarUuid: string, classDate: string): Observable<any> {
        return this.httpClient.get<any>(`${this.apiUrl}/gk/frequencia/porCalendario/${calendarUuid}/${classDate}`)
            .pipe(
                catchError(this.handleError) // Lidar com erros retornados pelas requisições HTTP
            );
    }

    /**
     * Atualiza os dados de frequência de um aluno.
     *
     * @param frequency O objeto de frequência a ser atualizado.
     * @returns Um Observable representando o resultado da atualização da frequência.
     */
    updateFrequency(frequency: Frequency): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.httpClient.put<any>(`${this.apiUrl}/gk/frequencia/`, frequency, { headers })
            .pipe(
                catchError(this.handleError) // Lidar com erros retornados pelas requisições HTTP
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

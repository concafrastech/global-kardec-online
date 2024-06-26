/**
 * Classe relacionada ao conteúdo de um curso.
 *
 * Todos os direitos pertencem à Concafras.
 *
 * Esta classe encapsula a estrutura do conteúdo de um curso,
 * fornecendo métodos para acessar e manipular os conteúdos de cada aula.
 *
 * Portal da Concafras: https://portal.concafras.com/
 *
 */

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import { Content } from '../../models/content';

@Injectable({
    providedIn: 'root'
})
export class ResourceService {
    /**
     * Variável de ambiente
     *
     * @private
     */
    private apiUrl: string;

    /**
     * Construtor
     *
     * @param httpClient
     */
    constructor(
        private httpClient: HttpClient
    ) {
        // Define a URL da API a partir das configurações de ambiente

        this.apiUrl = environment.apiUrl;
    }

    /**
     * Obtém um recurso específico com base no UUID fornecido.
     *
     * @param uuid O UUID do recurso a ser obtido.
     * @returns Um Observable contendo os detalhes do recurso.
     */
    getResource(uuid: string): Observable<any> {
        return this.httpClient.get<any>(`${this.apiUrl}/gk/conteudo/${uuid}`)
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
      * Obtém todos os recursos associados a um determinado curso.
      *
      * @param courseUUID O UUID do curso para o qual os recursos serão obtidos.
      * @returns Um Observable contendo uma lista de recursos do curso.
      */
    getCourseResources(courseUUID: string): Observable<any> {
        return this.httpClient.get<any>(`${this.apiUrl}/gk/conteudo/porCurso/${courseUUID}`)
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
     *
     * @param uuid
     */
    deleteResource(uuid: string): Observable<any> {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.httpClient.delete<any>(
            `${this.apiUrl}/gk/conteudo/${uuid}`,
            {headers}
        ).pipe(
            catchError(this.handleError) // Trata erros que ocorrem na requisição
        );
    }

    /**
     *
     * @param resource
     */
    postResource(resource: Content): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpClient.post<any>(`${this.apiUrl}/gk/conteudo`, JSON.stringify(resource), { headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
     *
     * @param resource
     */
    updateResource(resource: Content): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.httpClient.put<any>(`${this.apiUrl}/gk/conteudo/`, resource, { headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
     * Obtém o conteúdo associado a um curso específico.
     * @param idCourse O ID do curso para o qual o conteúdo será recuperado.
     */
    public getContentPerCourse(idCourse: string): Observable<any> {
        let headers = {'Content-Type': 'application/json'};

        return this.httpClient.get<any>(
            `${this.apiUrl}/gk/conteudo/porCurso/${idCourse}`,
            {headers}
        )
            .pipe(
                // Lidar com respostas da API em potencial com ou sem uma propriedade "data"
                map(response => response.data || response),
                catchError(this.handleError)
            );
    }

    /**
     *
     * @param error
     */
    private handleError(error: any): Observable<any> {
        // Implemente a lógica de tratamento de erros aqui, como logar o erro ou exibir uma mensagem de erro para o usuário
        console.error('Ocorreu um erro:', error);
        throw error;
    }
}

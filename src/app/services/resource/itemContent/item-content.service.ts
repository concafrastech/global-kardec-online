/**
 * Service relacionada ao item de um conteúdo de um curso.
 *
 * Todos os direitos pertencem à Concafras.
 *
 * Endpoints para gerenciar conteudos de curso
 *
 * Portal da Concafras: https://portal.concafras.com/
 *
 */
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ItemContent} from "../../../models/itemContent";

@Injectable({
    providedIn: 'root'
})
export class ItemContentService {
    /**
     * Variável de ambiente
     *
     * @private
     */
    private apiUrl: string;

    /**
     * Construtor da classe ItemContentService.
     *
     * @param http O serviço HttpClient para fazer requisições HTTP.
     * @param apiUrl A URL base da API fornecida pelo ambiente.
     */
    constructor(
        private http: HttpClient,

    ) {
        this.apiUrl = environment.apiUrl;
    }

    /**
     * Atualiza as informações de um item de conteúdo.
     *
     * @param item O objeto contendo as informações atualizadas do item de conteúdo.
     * @returns Um Observable que emite a resposta da requisição HTTP.
     *
     */
    updateItemContent(item: ItemContent): Observable<any> {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        return this.http.put<any>(
            `${this.apiUrl}/gk/itemConteudo`,
            item,
            {headers}
        ).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * Atualiza o conteúdo de um item específico associado a um determinado centro.
     *
     * @param item Objeto contendo as informações do recurso a ser atualizado.
     * @param idCentro O ID do centro ao qual o item está associado (padrão é 84d13166-39cf-11ed-9067-706979ac0e21).
     * @returns Um Observable que emite a resposta da requisição HTTP.
     */
    setItemContentFromCentro(item: ItemContent, idCentro: string = "84d13166-39cf-11ed-9067-706979ac0e21"): Observable<any> {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        return this.http.post<any>(
            `${this.apiUrl}/gk/itemConteudo/${idCentro}`,
            item,
            {headers}
        ).pipe(
            catchError(this.handleError) // Trata erros que ocorrem na requisição
        );
    }

    /**
     * Obtém as informações de um item de conteúdo com base no seu ID.
     *
     * @param idItemContent O ID do item de conteúdo a ser obtido.
     * @returns Um Observable que emite as informações do item de conteúdo.
     *
     */
    getItemContent(idItemContent: string): Observable<any> {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        return this.http.get<any>(
            `${this.apiUrl}/gk/itemConteudo/${idItemContent}`,
            {headers}
        ).pipe(
            catchError(this.handleError) // Trata erros que ocorrem na requisição
        );
    }

    /**
     * Obtém as informações de um item de conteúdo com base no seu ID.
     *
     * @param idIContent O ID do item de conteúdo a ser obtido.
     * @returns Um Observable que emite as informações do item de conteúdo.
     *
     */
    getItemPerIdContent(idIContent: string): Observable<any> {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        return this.http.get<any>(
            `${this.apiUrl}/gk/itemConteudo/84d13166-39cf-11ed-9067-706979ac0e21/porConteudo/${idIContent}`,
            {headers}
        ).pipe(
            catchError(this.handleError) // Trata erros que ocorrem na requisição
        );
    }

    /**
     * Exclui um item de conteúdo com base no seu ID.
     *
     * @param idItemContent O ID do item de conteúdo a ser excluído.
     * @returns Um Observable que emite a resposta da requisição HTTP.
     *
     */
    deleteItemContent(idItemContent: string): Observable<any> {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        return this.http.delete<any>(
            `${this.apiUrl}/gk/itemConteudo/${idItemContent}`,
            {headers}
        ).pipe(
            catchError(this.handleError) // Trata erros que ocorrem na requisição
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

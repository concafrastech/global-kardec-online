import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Resource } from '../../models/resource';

@Injectable({
    providedIn: 'root'
})
export class ResourceService {
    private apiUrl: string;

    constructor(private httpClient: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    getResource(uuid: string): Observable<any> {
        return this.httpClient.get<any>(`${this.apiUrl}/gk/conteudo/${uuid}`)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteResource(uuid: string): Observable<any> {
        return this.httpClient.delete<any>(`${this.apiUrl}/gk/conteudo/${uuid}`)
            .pipe(
                catchError(this.handleError)
            );
    }

    postResource(resource: Resource): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.httpClient.post<any>(`${this.apiUrl}/gk/conteudo/`, resource, { headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    updateResource(resource: Resource): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.httpClient.put<any>(`${this.apiUrl}/gk/conteudo/`, resource, { headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: any): Observable<any> {
        // Implemente a lógica de tratamento de erros aqui, como logar o erro ou exibir uma mensagem de erro para o usuário
        console.error('Ocorreu um erro:', error);
        throw error;
    }
}
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
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
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.put<any>(`${this.apiUrl}/gk/frequencia/`, frequency, { headers })
      .pipe(
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

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Course } from '../../models/course';

@Injectable({
    providedIn: 'root',
})
export class CourseSerivce {
    private apiUrl: String;

    constructor(private _http: HttpClient) {
        // Define a URL da API a partir das configurações de ambiente
        this.apiUrl = environment.apiUrl;
    }

    /**
     * Esta função retorna todos os cursos cadastrados na base de dados.
     *
     * @return Observable<any> - Um objeto Observable contendo a resposta da requisição HTTP.
     */
    getAllCourses(): Observable<any> {
        let headers = {
            'Content-Type': 'application/json',
        };

        // Realiza uma requisição GET para obter todos os cursos
        return this._http.get(`${this.apiUrl}/gk/curso`, { headers });
    }

    /**
     * Esta função é responsável por criar um curso na base de dados.
     *
     * @param course - Um objeto do tipo Course contendo os dados do curso a ser criado.
     * @return Observable<any> - Um objeto Observable contendo a resposta da requisição HTTP.
     */
    createCourse(course: Course): Observable<any> {
        let headers = {
            'Content-Type': 'application/json',
        };

        // Realiza uma requisição POST para criar um novo curso
        return this._http.post(`${this.apiUrl}/gk/curso`, course, { headers });
    }

    /**
     * Esta função é responsável por excluir um curso da base de dados.
     *
     * @param uuid - O identificador único do curso a ser excluído.
     * @return Observable<any> - Um objeto Observable contendo a resposta da requisição HTTP.
     */
    deleteCourse(uuid: string): Observable<any> {
        let headers = {
            'Content-Type': 'application/json',
        };
        
        // Realiza uma requisição DELETE para excluir um curso específico
        return this._http.delete(`${this.apiUrl}/gk/curso/${uuid}`, { headers });
    }

    /**
     * Esta função é responsável por atualizar um curso na base de dados.
     *
     * @param course - Um objeto do tipo Course contendo os novos dados do curso a ser atualizado.
     * @return Observable<any> - Um objeto Observable contendo a resposta da requisição HTTP.
     */
    updateCourse(course: Course): Observable<any> {
        let headers = {
            'Content-Type': 'application/json',
        };
        
        // Realiza uma requisição PUT para atualizar um curso existente
        return this._http.put(`${this.apiUrl}/gk/curso`, course, { headers });
    }
}

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
        this.apiUrl = environment.apiUrl;
    }

    /**
     * Esta função retorna todos os cursos cadastrados na base de dados.
     *
     * @return Object JSON
     */
    getAllCourses(): Observable<any> {
        let headers = {
            'Content-Type': 'application/json',
        };

        return this._http.get(`${this.apiUrl}/gk/curso`, { headers });
    }

    /**
     * Esta função é responsável por criar um curso na base de dados.
     *
     * @param course - É um objeto seguindo o padrão do model Course.
     * @return Object JSON
     */
    createCourse(course: Course): Observable<any> {
        let headers = {
            'Content-Type': 'application/json',
        };

        return this._http.post(`${this.apiUrl}/gk/curso`, course, { headers });
    }

    deleteCourse(uuid: string): Observable<any> {
        let headers = {
            'Content-Type': 'application/json',
        };

        return this._http.delete(`${this.apiUrl}/gk/curso/${uuid}`, { headers });
    }
}

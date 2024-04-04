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

    getAllCourses(): Observable<any> {
        let headers = {
            'Content-Type': 'application/json',
        };

        return this._http.get(`${this.apiUrl}/gk/curso`, { headers });
    }

    createCourse(course: Course): Observable<any> {
        let headers = {
            'Content-Type': 'application/json',
        };

        return this._http.post(`${this.apiUrl}/gk/curso`, course, { headers });
    }
}

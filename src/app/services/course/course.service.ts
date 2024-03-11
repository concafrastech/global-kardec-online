import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

        return this._http.get(`${this.apiUrl}/gk/curso/`, { headers });
    }
}

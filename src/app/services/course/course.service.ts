import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CourseSerivce {
    private apiUrl: String;

    constructor() {
        this.apiUrl = environment.apiUrl;
    }

    get(): any {
        console.log(this.apiUrl);
    }
}

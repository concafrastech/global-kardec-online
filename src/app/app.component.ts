import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CourseSerivce } from './services/course/course.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.less',
})
export class AppComponent implements OnInit {
    title = 'global-kardec-online';
    visible: boolean = false;

    constructor(private _courseService: CourseSerivce) {}

    ngOnInit(): void {
        this._courseService.getAllCourses().subscribe({
            next: (response) => {
                console.log(response);
            },
        });
    }

    showDialog() {
        this.visible = true;
    }
}

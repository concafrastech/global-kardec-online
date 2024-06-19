import { Component, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormBuilder,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

// Models
import { Course } from '../../../models/course';
import { SpiritCenter } from '../../../models/spiritCenter';

// Services
import { CourseSerivce } from '../../../services/course/course.service';
import { SpiritCenterService } from '../../../services/spirit-center/spirit-center.service';

import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { PaginatorModule } from 'primeng/paginator';

@Component({
    selector: 'app-class-new',
    standalone: true,
    imports: [
        Button,
        CardModule,
        RouterLink,
        DropdownModule,
        InputTextModule,
        MessagesModule,
        PaginatorModule,
        ReactiveFormsModule,
    ],
    templateUrl: './class-new.component.html',
    styleUrl: './class-new.component.less',
})
export class ClassNewComponent implements OnInit {
    // BehaviorSubject para gerenciar o estado dos Cursos
    private coursesSubject = new BehaviorSubject<any[]>([]);

    // Observable para os Cursos
    courses$ = this.coursesSubject.asObservable();

    // Array para armazenar os Cursos disponíveis
    courses: Course[] | undefined;

    // BehaviorSubject para gerenciar o estado dos Centros Espíritas
    private SpiritCenterSubject = new BehaviorSubject<any[]>([]);

    // Observable para os Centros Espíritas
    SpiritCenter$ = this.coursesSubject.asObservable();

    // Array para armazenar os Centros Espíritas disponíveis
    SpiritCenter: SpiritCenter[] | undefined;

    // FormGroup para controlar o formulário
    formControl!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private courseService: CourseSerivce,
        private spiritCenterService: SpiritCenterService,
    ) {}

    ngOnInit(): void {
        this.initializeForm();

        this.getCourses();

        this.getSpiritCenter();
    }

    /**
     * Inicializa o formulário com os campos e validadores necessários.
     */
    private initializeForm(): void {
        localStorage.removeItem('courseInfo');
        this.formControl = this.formBuilder.group({
            course: new FormControl('', [Validators.required]),
            spirit: new FormControl('', [Validators.required]),
            calendar: new FormControl('', [Validators.required]),
            link: new FormControl('', [Validators.required]),
        });
    }

    getCourses(): void {
        this.courses$.subscribe((courses) => {
            // Atualiza a lista de institutos quando ocorrem alterações
            this.courses = courses;
        });
        this.courseService.getAllCourses().subscribe({
            next: async (courses) => {
                this.updateCourses(courses.content);
            },
            error: (error) => console.error(error),
        });
    }

    private updateCourses(courses: any[]): void {
        this.coursesSubject.next(courses);
    }

    getSpiritCenter(): void {
        this.SpiritCenter$.subscribe((SpiritCenter) => {
            // Atualiza a lista de institutos quando ocorrem alterações
            this.SpiritCenter = SpiritCenter;
        });
        this.spiritCenterService.getAllSpiritsCenter().subscribe({
            next: async (SpiritCenter) => {
                this.updateCourses(SpiritCenter);
            },
            error: (error) => console.error(error),
        });
    }

    private updateSpiritCenterSpiritCenter(SpiritCenter: any[]): void {
        this.SpiritCenterSubject.next(SpiritCenter);
    }

    salveClass() {
        console.log(this.formControl)
    }
}

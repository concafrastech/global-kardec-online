import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { dataTempModel } from '../../../models/courses'
import { Course } from '../../../models/course';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CourseSerivce } from '../../../services/course/course.service';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-courses-dashboard',
    standalone: true,
    imports: [
        CardModule,
        TableModule,
        CommonModule,
        ButtonModule,
        ToastModule,
        ConfirmDialogModule
    ],
    templateUrl: './courses-dashboard.component.html',
    styleUrl: './courses-dashboard.component.less',
    providers: [MessageService, ConfirmationService, CourseSerivce]
})
export class CoursesDashboardComponent implements OnInit {

    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private courseService: CourseSerivce
    ) { }

    cols!: Course[];
    coursesList!: Course[]
    private courseSubject = new BehaviorSubject<any[]>([]);
    courses$ = this.courseSubject.asObservable()

    confirmDelete(event: Event, courseName: string) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: `Esta exclusão é permanente. <br/> <b>Você tem certeza?<b/>`,
            header: `Você está excluindo o curso ${courseName}.`,
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: "p-button-danger p-button-text",
            rejectButtonStyleClass: "p-button-text p-button-text",
            acceptIcon: "none",
            rejectIcon: "none",
            acceptLabel: 'Sim',
            rejectLabel: 'Não',

            accept: () => {
                this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: `Curso  ${courseName} excluído!` });
            },
            reject: () => {
                this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'Ok.' });
            }
        });
    }

    ngOnInit() {
        this.courseService.getAllCourses().subscribe({
            next: response => {
                console.log(response.content)
                this.updateCourse(response.content)
            },
            error: error => {
                console.error(error);
            }
        })
        this.courses$.subscribe(coursesItems => {
            this.coursesList = coursesItems
        })
    }
    updateCourse(objectCourse: any[]) {
        this.courseSubject.next(objectCourse)
        console.log(objectCourse);
        
    }

}

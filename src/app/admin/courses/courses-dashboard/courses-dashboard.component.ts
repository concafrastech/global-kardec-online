import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { dataTempModel } from '../../../models/courses'
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';


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
    providers: [MessageService, ConfirmationService]
})
export class CoursesDashboardComponent implements OnInit {

    constructor(private confirmationService: ConfirmationService, private messageService: MessageService) { }

    cols!: dataTempModel[];
    coursesList: dataTempModel[] = [
        {
            nome_do_curso: "NBDE",
            idioma: "Português",
            instituto: "Ciclo Introdutório"
        },
        {
            nome_do_curso: "Nosso Lar",
            idioma: "Português",
            instituto: "Ciclo Introdutório"
        },
        {
            nome_do_curso: "Passe",
            idioma: "Português",
            instituto: "Ciclo Introdutório"
        },
        {
            nome_do_curso: "Corrente Magnética",
            idioma: "Português",
            instituto: "Ciclo Introdutório"
        },
        {
            nome_do_curso: "Vibração",
            idioma: "Português",
            instituto: "Ciclo Introdutório"
        }
    ]

    confirmDelete(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Você irá deletar esse curso?',
            header: 'Confirmar exclusão de curso',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: "p-button-danger p-button-text",
            rejectButtonStyleClass: "p-button-text p-button-text",
            acceptIcon: "none",
            rejectIcon: "none",
            acceptLabel: 'Sim',
            rejectLabel: 'Não',

            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Curso deletado!' });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejeitado', detail: 'Você negou a exclusão.' });
            }
        });
    }

    ngOnInit() {

    }

}

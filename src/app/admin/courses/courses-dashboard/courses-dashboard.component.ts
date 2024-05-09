import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { dataTempModel } from '../../../models/courses'; // Importa o modelo de dados temporários
import { Course } from '../../../models/course'; // Importa o modelo Course
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CourseSerivce } from '../../../services/course/course.service'; // Importa o serviço CourseService
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
    templateUrl: './courses-dashboard.component.html', // Define o template HTML para o componente
    styleUrl: './courses-dashboard.component.less', // Define o arquivo de estilo LESS para o componente
    providers: [MessageService, ConfirmationService, CourseSerivce] // Provedores de serviços necessários para o componente
})
export class CoursesDashboardComponent implements OnInit {

    constructor(
        private confirmationService: ConfirmationService, // Serviço de confirmação para diálogos de exclusão
        private messageService: MessageService, // Serviço para exibir mensagens
        private courseService: CourseSerivce, // Serviço para interagir com os cursos
    ) { }

    cols!: Course[]; // Array de colunas para a tabela
    coursesList!: Course[]; // Lista de cursos
    private courseSubject = new BehaviorSubject<any[]>([]); // Assunto BehaviorSubject para os cursos
    courses$ = this.courseSubject.asObservable(); // Observable para os cursos

    /**
     * Confirma a exclusão de um curso.
     *
     * @param event - O evento que acionou a exclusão
     * @param courseName - O nome do curso a ser excluído
     * @param courseUUID - O UUID (identificador único) do curso a ser excluído
     */
    confirmDelete(event: Event, courseName: string, courseUUID: string) {
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
                // Exclui o curso ao confirmar a exclusão
                this.courseService.deleteCourse(courseUUID).subscribe({
                    next: (response) => {
                        console.log(response);
                    },
                    error: (error) =>{
                        console.error(error);
                    }
                })
                // Exibe uma mensagem de sucesso após a exclusão do curso
                this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: `Curso ${courseName} excluído!` });
              
            },
            reject: () => {
                // Exibe uma mensagem de cancelamento se a exclusão for cancelada
                this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'Ok.' });
            }
        });
    }

    ngOnInit() {
        // Ao inicializar o componente, obtém todos os cursos e atualiza a lista de cursos
        this.courseService.getAllCourses().subscribe({
            next: response => {
                console.log(response.content)
                this.updateCourse(response.content)
            },
            error: error => {
                console.error(error);
            }
        })
        // Assina os cursos atualizados
        this.courses$.subscribe(coursesItems => {
            this.coursesList = coursesItems
        })
    }

    /**
     * Atualiza a lista de cursos.
     *
     * @param objectCourse - Um array contendo os dados dos cursos
     */
    updateCourse(objectCourse: any[]) {
        // Atualiza adicionando valores à cursos
        this.courseSubject.next(objectCourse)
        console.log(objectCourse);
    }

}

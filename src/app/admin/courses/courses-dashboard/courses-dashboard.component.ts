import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Course } from '../../../models/course';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CourseSerivce } from '../../../services/course/course.service';
import { BehaviorSubject } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { ResourceService } from '../../../services/resource/resource.service';
import {SearchIcon} from 'primeng/icons/search'



@Component({
    selector: 'app-courses-dashboard',
    standalone: true,
    imports: [
        CardModule,
        TableModule,
        CommonModule,
        ButtonModule,
        ToastModule,
        ConfirmDialogModule,
        RouterLink,
        MessagesModule,
        SearchIcon
    ],
    templateUrl: './courses-dashboard.component.html',
    styleUrl: './courses-dashboard.component.less',
    providers: [MessageService, ConfirmationService, CourseSerivce],
})

/**
 * Lista os cursos que existem
 */
export class CoursesDashboardComponent implements OnInit {

    /**
     * Construtor para inicializar o componente.
     * @param confirmationService Serviço para lidar com diálogos de confirmação.
     * @param messageService Serviço para exibir mensagens.
     * @param courseService Serviço para gerenciar cursos.
     */
    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private courseService: CourseSerivce,
        private resourceService: ResourceService
    ) {
    }

    /**
     * Array para armazenar dados das colunas para a tabela de cursos.
     */
    cols!: Course[];

    /**
     * Array para armazenar a lista de cursos.
     */
    public coursesList!: Course[];

    /**
     * Sinalizador booleano para controlar a visibilidade da tabela.
     */
    public showTableMessage: boolean = true;

    /**
     * Assunto para observar mudanças na lista de cursos.
     * @private
     */
    private courseSubject = new BehaviorSubject<any[]>([]);

    /**
     * Fluxo observável de cursos.
     */
    courses$ = this.courseSubject.asObservable();

    messages: Message[] = [];


    /**
     * Método do ciclo de vida do Angular que é chamado após a inicialização do componente.
     */
    ngOnInit() {
        this.messages = [{
            severity: 'info',
            detail: 'Não há cursos para serem listados. Comece criando o primeiro curso.'
        }];

        /**
         * Chama todos os cursos que existem para ser listados
         * Atualiza a variável dos cursos que serão listados
         * Torna assim a tabela dinâmica
         */
        this.getAllCourses();


    }

    /**
     * Retorna a lista de cursos que existem atualmente cadastrados no banco de dados
     *
     * @return Course
     */
    getAllCourses(): void {
        // Obtém todos os cursos e atualiza a lista de cursos quando a resposta for recebida.
        this.courseService.getAllCourses().subscribe({
            next: (response) => {
                this.updateListCourse(response.content);
                this.showTableMessage = false;
            },
            error: (error) => {
                console.error(error);
            },
        });

        // Subscreve-se para receber atualizações na lista de cursos.
        this.courses$.subscribe((coursesItems) => {
            this.coursesList = coursesItems;
        });
    }


    /**
     * Confirma a exclusão de um curso.
     * @param event O evento que acionou a função.
     * @param courseName O nome do curso a ser excluído.
     */
    confirmDelete(event: Event, courseName: string, courseUUID: string, course: Course) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: `Esta exclusão é permanente. <br/> <b>Você tem certeza?<b/>`,
            header: `Você está excluindo o curso ${courseName}.`,
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: 'p-button-danger p-button-text',
            rejectButtonStyleClass: 'p-button-text p-button-text',
            acceptIcon: 'none',
            rejectIcon: 'none',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',

            accept: () => {
                // Arquiva o curso ao confirmar a exclusão
                this.courseService.archivingCourse(course).subscribe({
                    next: (response) => {
                        this.getAllCourses();
                        console.log(response);
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Excluído!',
                            detail: `O curso ${courseName} foi excluído!`
                        });
                    },
                    error:(error) => {
                         // Exibe uma mensagem de cancelamento se a exclusão for cancelada
                         console.error(error);
                         this.messageService.clear()
                         this.messageService.add({
                             severity: 'error',
                             summary: 'Erro',
                             detail: `Ocorreu um erro na exclusão do curso ${courseName}`
                         });
                    },
                })
                
                // Exibe uma mensagem de sucesso após a exclusão do curso
                this.messageService.add({
                    severity: 'info',
                    summary: 'Confirmado',
                    detail: `O curso ${courseName} será excluído!`
                });

            },
            reject: () => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Cancelado',
                    detail: 'Ok.',
                });
            },
        });
    }


    /**
     * Atualiza a lista de cursos.
     *
     * @param objectCourse O objeto contendo os cursos a serem atualizados.
     */
    updateListCourse(objectCourse: any[]) {
        this.courseSubject.next(objectCourse);
    }

    checkCourseResources(courseUUID: string): void {
        try {
            this.resourceService.getCourseResources(courseUUID)
            
        } catch (error) {
            return console.error(error);
        }
    }
}


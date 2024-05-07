import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import { TabViewComponent } from '../../../components/admin/tab-view/tab-view.component';


import { CourseSerivce } from '../../../services/course/course.service';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { Message } from 'primeng/api';

import { Course } from '../../../models/course';

import { UtilsService } from '../../../services/utilities/auxiliary/utils.service';

import { DropdownModule } from 'primeng/dropdown';

import { BehaviorSubject } from 'rxjs';

import { Institutes } from '../../../models/institutes';

import { Languages } from '../../../models/languages';

import { ToastModule } from 'primeng/toast';

import { UploadImageComponent } from './upload-image/upload-image.component';


@Component({
    selector: 'app-courses-new',
    standalone: true,
    imports: [
        ButtonModule,
        InputTextModule,
        InputTextareaModule,
        TabViewComponent,
        ConfirmDialogModule,
        ReactiveFormsModule,
        MessagesModule,
        MessageModule,
        DropdownModule,
        ToastModule,
        UploadImageComponent

    ],
    templateUrl: './courses-new.component.html',
    styleUrl: './courses-new.component.less',
    providers: [ConfirmationService, MessageService]

})

export class CoursesNewComponent implements OnInit {
    // BehaviorSubject para gerenciar o estado dos institutos
    private institutesSubject = new BehaviorSubject<any[]>([]);

    // BehaviorSubject para gerenciar o estado dos institutos
    private languagesSubject = new BehaviorSubject<any[]>([]);

    // FormGroup para controlar o formulário
    formControl!: FormGroup;

    // Variável para controlar a classe fechar do modal
    closableClass: boolean = false;

    // Array de mensagens para feedback ao usuário
    messages!: Message[];

    // Flag para controlar a exibição de erros
    showError: boolean = false;

    // Array para armazenar os institutos disponíveis
    institutes: Institutes[] | undefined;

    // Array para armazenar os Idiomas disponíveis
    languages: Languages[] | undefined;

    // Observable para os institutos
    institutes$ = this.institutesSubject.asObservable();

    // Observable para os Idiomas
    languages$ = this.languagesSubject.asObservable();

    enabledCourse: boolean = false;

    // Recebe a imagem oriunda do component filho
    infoToChild: string = "";


    /**
     *
     * @param confirmationService
     * @param messageService
     * @param courseService
     * @param formBuilder
     * @param UtilsService
     */
    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private courseService: CourseSerivce,
        private formBuilder: FormBuilder,
        private UtilsService: UtilsService

    ) { }




    ngOnInit(): void {
        // Inicialização do formulário com validadores
        this.formControl = this.formBuilder.group({
            name: new FormControl('', [Validators.required]),
            institute: new FormControl('', [Validators.required]),
            language: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
        });

        // Chamada para obter todos os cursos disponíveis
        this.courseService.getAllCourses().subscribe({
            next: courses => {
                // Manipulação dos cursos, se necessário
            },
            error: error => console.error(error)
        });

        // Inicialização das mensagens de erro
        this.messages = [
            { severity: 'error', summary: 'Atenção', detail: 'Algo está errado, por favor verifique ' },
        ];

        // Chamada para obter os institutos disponíveis
        this.UtilsService.getInstitutes().subscribe({
            next: async institutes => {
                // Atualiza os institutos quando os dados são recebidos
                this.updateInstitutes(institutes);
            },
            error: error => console.error(error)
        });


        // Chamada para obter os institutos disponíveis
        this.UtilsService.getLanguages().subscribe({
            next: async languages => {
                // Atualiza os institutos quando os dados são recebidos
                this.updateLanguages(languages);
            },
            error: error => console.error(error)
        });

        // Inscreve-se no Observable institutes$ para monitorar alterações
        this.institutes$.subscribe(institutes => {
            // Atualiza a lista de institutos quando ocorrem alterações
            this.institutes = institutes;
        });

        // Inscreve-se no Observable institutes$ para monitorar alterações
        this.languages$.subscribe(languages => {
            // Atualiza a lista de institutos quando ocorrem alterações
            this.languages = languages;
        });
    }
    // Função para deletar um curso
    deleteTheClass(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: "p-button-danger p-button-text",
            rejectButtonStyleClass: "p-button-text p-button-text",
            acceptIcon: "none",
            rejectIcon: "none",

            accept: () => {
                this.closableClass = true;
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            }
        });
    }

    /**
     * 
     * @param imag 
     */
    getImage(imag: string) {
        this.infoToChild = imag;
    }
    /**
     * Cria um novo curso com base nos dados fornecidos pelo usuário no formulário.
     * Verifica se o formulário é válido antes de enviar os dados para o serviço de criação de curso.
     * Se o formulário for válido e todos os campos necessários estiverem preenchidos, cria um objeto de curso
     * e envia os dados para o serviço de criação de curso. Caso contrário, define a flag de erro para exibir uma mensagem ao usuário.
     */
    createCourse(): void {
        const name = this.formControl.get('name')?.value;
        const description = this.formControl.get('description')?.value;
        const institute = this.formControl.get('institute')?.value;
        const language = this.formControl.get('language')?.value;
        // Verificar se o formulário é válido
        if (this.formControl.valid) {
            // Criar o objeto de curso com os valores do formulário
            if (name !== null && description !== null && institute !== null && language !== null) {

                const course: Course = {
                    "nome": name,
                    "capaCurso": "string",
                    "descricao": description,
                    "nomeInstituto": institute,
                    "nomeIdioma": language,
                    "nomeTipoCurso": 1,
                    "modalidadeEnsino": "PRESENCIAL"
                }
                this.courseService.createCourse(course).subscribe({
                    next: response => {
                        console.log(response)
                        // Adiciona uma mensagem de sucesso
                        this.messageService.add({ severity: 'info', summary: 'Adicionado', detail: 'Curso adicionado com sucesso' });

                        this.formControl.disable()

                        this.enabledCourse = true;


                        // Limpa o formulário após adicionar com sucesso
                        //   this.formControl.reset();
                    },
                    error: error => {
                        // Lógica de manipulação de erro, se necessário
                        console.error('Erro ao criar curso:', error);
                    }
                });

            } else {
                // Tratar caso algum valor seja nulo
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Todos os campos são obrigatórios' });

            }

            // Enviar o curso para o serviço

        } else {
            // Mostrar erro se o formulário não for válido
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Todos os campos são obrigatórios' });
        }
    }

    updateInstitutes(institutes: any[]) {
        this.institutesSubject.next(institutes);
    }
    updateLanguages(languages: any[]) {
        this.languagesSubject.next(languages);
    }

}

import {Component, OnInit, HostListener} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {FormControl, FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';

import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService, MessageService} from 'primeng/api';

import {TabViewComponent} from '../../../components/admin/tab-view/tab-view.component';


import {CourseSerivce} from '../../../services/course/course.service';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {Message} from 'primeng/api';

import {Course} from '../../../models/course';

import {UtilsService} from '../../../services/utilities/auxiliary/utils.service';

import {DropdownModule} from 'primeng/dropdown';

import {BehaviorSubject} from 'rxjs';

import {Institutes} from '../../../models/institutes';

import {Languages} from '../../../models/languages';

import {ToastModule} from 'primeng/toast';

import {UploadImageComponent} from './upload-image/upload-image.component';

import {ActivatedRoute} from '@angular/router';


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

    // Flag para controlar se o formulário foi modificado
    textBottom: string = "Criar curso";

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
        private UtilsService: UtilsService,
        private route: ActivatedRoute
    ) {
    }


    ngOnInit(): void {
        // Inicializa o formulário com validadores
        this.initializeForm();

        // Carrega o curso salvo do localStorage, se existir
        //this.loadSavedCourseFromLocalStorage();

        // Carrega os cursos disponíveis
        this.loadAvailableCourses();

        // Inicializa as mensagens de erro
        this.initializeErrorMessages();

        // Carrega os institutos e os idiomas disponíveis
        this.loadAvailableInstitutesAndLanguages();

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

        this.updateCourse();

    }


    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: BeforeUnloadEvent) {
        console.log($event);

        // Impedir comportamento padrão (opcional)
        $event.preventDefault(); // Descomente se precisar impedir o comportamento padrão

        const mensagemConfirmacao = 'Você tem alterações não salvas. Tem certeza que deseja sair?';

        return this.confirmationService.confirm({
            message: mensagemConfirmacao,
            header: 'Confirmação de Saída', // Ajuste o texto do cabeçalho conforme necessário
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: "p-button-danger p-button-text",
            rejectButtonStyleClass: "p-button-text p-button-text",
            acceptIcon: "none",
            rejectIcon: "none",
            accept: () => {
                // Execute qualquer ação necessária antes de sair da página (por exemplo, salvar dados)
                this.closableClass = true;
                this.messageService.add({severity: 'info', summary: 'Confirmado', detail: 'Saindo...'});
            },
            reject: () => {
                this.messageService.add({severity: 'error', summary: 'Cancelado', detail: 'Permanecendo na página'});
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
        // Verifica se o formulário é válido
        if (this.formControl.invalid) {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Todos os campos são obrigatórios' });
            return;
        }

        // Cria o objeto de curso com os valores do formulário
        const course: Course = {
            nome: this.formControl.get('name')?.value,
            descricao: this.formControl.get('description')?.value,
            instituto: this.formControl.get('institute')?.value,
            idioma: this.formControl.get('language')?.value,
            capaCurso: 'string', // Defina o valor adequado para capaCurso
            tipoCurso: 1,
            modalidadeEnsino: 'PRESENCIAL'
        };

        // Chama o serviço para criar o curso
        this.courseService.createCourse(course).subscribe({
            next: response => {
                this.messageService.add({ severity: 'info', summary: 'Adicionado', detail: 'Curso adicionado com sucesso' });
                this.formControl.disable();
                this.enabledCourse = true;
                // Limpa o formulário após adicionar com sucesso
                // this.formControl.reset();
                // Salva as informações do curso, se necessário
                localStorage.setItem('courseInfo', JSON.stringify({ nome: response.nome, id: response.uuid }));
            },
            error: error => {
                console.error('Erro ao criar curso:', error);
                // Lógica de manipulação de erro, se necessário
            }
        });
    }


    /**
     * Atualiza o BehaviorSubject `institutesSubject` com a lista de institutos recebida.
     * Isso notifica os observadores que há uma atualização nos institutos disponíveis.
     * @param institutes A lista de institutos a ser atualizada.
     */
    private updateInstitutes(institutes: any[]): void {
        this.institutesSubject.next(institutes);
    }

    /**
     * Atualiza o BehaviorSubject `languagesSubject` com a lista de idiomas recebida.
     * Isso notifica os observadores que há uma atualização nos idiomas disponíveis.
     * @param languages A lista de idiomas a ser atualizada.
     */
    private updateLanguages(languages: any[]): void {
        this.languagesSubject.next(languages);
    }

    /**
     * Carrega o curso salvo do localStorage, se existir,
     * e preenche o formulário com os valores recuperados.
     */
    private loadSavedCourseFromLocalStorage(): void {
        const savedCourse = localStorage.getItem('course');
        if (savedCourse) {
            const parsedCourse = JSON.parse(savedCourse);
            this.formControl.patchValue({
                name: parsedCourse.nome,
                description: parsedCourse.descricao,
                institute: parsedCourse.instituto,
                language: parsedCourse.idioma
            });
        }
    }


    /**
     * Inicializa o formulário com os campos e validadores necessários.
     */
    private initializeForm(): void {
        localStorage.removeItem('courseInfo');
        this.formControl = this.formBuilder.group({
            name: new FormControl('', [Validators.required]),
            institute: new FormControl('', [Validators.required]),
            language: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
        });
    }

    /**
     * Carrega os cursos disponíveis.
     */
    private loadAvailableCourses(): void {
        this.courseService.getAllCourses().subscribe({
            next: courses => {
                // Manipulação dos cursos, se necessário
            },
            error: error => console.error(error)
        });
    }

    /**
     * Inicializa as mensagens de erro.
     */
    private initializeErrorMessages(): void {
        this.messages = [
            {severity: 'error', summary: 'Atenção', detail: 'Algo está errado, por favor verifique '},
        ];
    }

    /**
     * Carrega os institutos e os idiomas disponíveis.
     */
    private loadAvailableInstitutesAndLanguages(): void {
        this.UtilsService.getInstitutes().subscribe({
            next: async institutes => {
                this.updateInstitutes(institutes);
            },
            error: error => console.error(error)
        });

        this.UtilsService.getLanguages().subscribe({
            next: async languages => {
                this.updateLanguages(languages);
            },
            error: error => console.error(error)
        });
    }

    /**
     * Atualiza os campos do formulário com os dados do curso.
     *
     * @private
     */
    private updateCourse(): void {
        // Obtém o ID do curso da rota atual
        const idCourse = this.route.snapshot.paramMap.get('id');
        // Verifica se o ID do curso está presente
        if (!idCourse) return;

        this.textBottom = "Atualizar Curso"

        // Chama o serviço para obter os detalhes do curso
        this.courseService.getCourse(idCourse).subscribe({
            next: ({nome, descricao, instituto, idioma}) => {
                // Define os valores recebidos nos campos do formControl
                this.formControl.patchValue({
                    name: nome,
                    description: descricao,
                    institute: instituto,
                    language: idioma
                });
            },
            error: error => console.error(error)
        });
    }

}

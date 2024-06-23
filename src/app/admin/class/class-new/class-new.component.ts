import {Component, OnInit} from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormBuilder,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import {RouterLink, Router, ActivatedRoute} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

// Models
import {Course} from '../../../models/course';
import {SpiritCenter} from '../../../models/spiritCenter';
import {Calendar} from '../../../models/calendar';

// Services
import {CourseSerivce} from '../../../services/course/course.service';
import {SpiritCenterService} from '../../../services/spirit-center/spirit-center.service';
import {CalendarService} from '../../../services/calendar/calendar.service';
import {ClassService} from '../../../services/class/class.service';

// PrimeNg
import {Button} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {MessagesModule} from 'primeng/messages';
import {Message} from 'primeng/api';
import {PaginatorModule} from 'primeng/paginator';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {Class} from '../../../models/class';

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
        ToastModule,
    ],
    templateUrl: './class-new.component.html',
    styleUrl: './class-new.component.less',
    providers: [MessageService],
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
    SpiritCenter$ = this.SpiritCenterSubject.asObservable();

    // Array para armazenar os Centros Espíritas disponíveis
    SpiritCenter: SpiritCenter[] | undefined;

    // BehaviorSubject para gerenciar o estado dos calendários
    private calendarsSubject = new BehaviorSubject<any[]>([]);

    // Observable para os Calendários
    calendars$ = this.calendarsSubject.asObservable();

    // Array para armazenar os Calendários disponíveis
    calendars: Calendar[] | undefined;

    // FormGroup para controlar o formulário
    formControl!: FormGroup;

    // Variável que controla a visualização do input do calendário
    calendarVisible: boolean = false;

    // Controla a visibilidade da mensagem sobre ter ou não calendário para o centro
    messageCalendar: boolean = false;

    messages: Message[] = []; // Inicializa como um array vazio

    // Obtém o ID do curso da rota atual
    public idClass = this.activeRoute.snapshot.paramMap.get('id');

    // Variável de instância para armazenar os dados da turma
    classRow: Class | undefined;


    /**
     *
     * @param formBuilder
     * @param courseService
     * @param spiritCenterService
     * @param calendarService
     * @param messageService
     * @param classService
     * @param router
     * @param activeRoute
     */
    constructor(
        private formBuilder: FormBuilder,
        private courseService: CourseSerivce,
        private spiritCenterService: SpiritCenterService,
        private calendarService: CalendarService,
        private messageService: MessageService,
        private classService: ClassService,
        private router: Router,
        private activeRoute: ActivatedRoute,
    ) {
    }

    /**
     *
     */
    ngOnInit(): void {
        this.initializeForm();

        this.getCourses();

        this.getSpiritCenter();

        if (this.idClass !== undefined) {
            this.isUpdateClass();
        }

        this.messages = [
            {
                severity: 'info',
                detail: 'O Centro Escolhido não possui calendários associado',
            },
        ];
    }

    /**
     * Inicializa o formulário com os campos e validadores necessários.
     */
    private initializeForm(): void {
        this.formControl = this.formBuilder.group({
            course: new FormControl('', [Validators.required]),
            spirit: new FormControl('', [Validators.required]),
            calendar: new FormControl('', [Validators.required]),
            link: new FormControl('', [Validators.required]),
        });
    }

    /**
     * Obtém a lista de cursos e atualiza o estado dos cursos disponíveis.
     */
    getCourses(): void {
        this.courses$.subscribe((courses) => {
            this.courses = courses;
        });
        this.courseService.getAllCourses().subscribe({
            next: async (courses) => {
                this.updateCourses(courses.content);
            },
            error: (error) => console.error(error),
        });
    }

    /**
     * Atualiza o BehaviorSubject com a lista de cursos.
     * @param courses - Lista de cursos a ser atualizada
     */
    private updateCourses(courses: any[]): void {
        this.coursesSubject.next(courses);
    }

    /**
     * Obtém a lista de centros espíritas e atualiza o estado dos centros espíritas disponíveis.
     */
    getSpiritCenter(): void {
        this.SpiritCenter$.subscribe((SpiritCenter) => {
            this.SpiritCenter = SpiritCenter;
        });
        this.spiritCenterService.getAllSpiritsCenter().subscribe({
            next: async (SpiritCenter) => {
                this.updateSpiritCenter(SpiritCenter);
            },
            error: (error) => console.error(error),
        });
    }

    /**
     * Atualiza o BehaviorSubject com a lista de centros espíritas.
     * @param SpiritCenter - Lista de centros espíritas a ser atualizada
     */
    private updateSpiritCenter(SpiritCenter: any[]): void {
        this.SpiritCenterSubject.next(SpiritCenter);
    }

    /**
     * Evento disparado quando o Centro Espírita é alterado.
     * Obtém a lista de calendários para o Centro Espírita selecionado.
     * @param event - Evento contendo o ID do Centro Espírita selecionado
     */
    onSpiritCenterChange(event: any): void {
        const selectedSpiritCenterId = event.value;
        if (selectedSpiritCenterId) {
            this.getCalendars(selectedSpiritCenterId);
        }
    }

    /**
     * Obtém a lista de calendários para o Centro Espírita especificado.
     * @param uuid - ID do Centro Espírita
     */
    getCalendars(uuid: string): void {
        this.calendars$.subscribe((calendars) => {
            this.calendars = calendars;
        });
        this.calendarService.getCalendarBySpiritCenter(uuid).subscribe({
            next: async (calendar) => {
                if (calendar.length) {
                    this.updateCalendars(calendar);
                    this.calendarVisible = true;
                    this.messageCalendar = false;
                } else {
                    this.messageCalendar = true;
                    this.calendarVisible = false;
                }
            },
            error: (error) => console.error(error),
        });
    }

    /**
     * Formata o rótulo do calendário combinando ano e semestre.
     * @param calendar - Objeto do calendário
     * @returns - Rótulo formatado
     */
    formatCalendarLabel(calendar: Calendar): string {
        return `${calendar.ano}/${calendar.semestre}`;
    }

    /**
     * Atualiza o BehaviorSubject com a lista de calendários formatados.
     * @param calendars - Lista de calendários a ser atualizada
     */
    private updateCalendars(calendars: Calendar[]): void {
        const formattedCalendars = calendars.map((calendar) => ({
            ...calendar,
            label: this.formatCalendarLabel(calendar),
        }));
        this.calendarsSubject.next(formattedCalendars);
    }

    /**
     * Método para salvar a classe com os dados do formulário.
     */
    saveClass() {
        if (this.formControl.valid) {
            const uuidCourse = this.formControl.get('course')?.value;
            const uuidSpirit = this.formControl.get('spirit')?.value;
            const uuiCalendar = this.formControl.get('calendar')?.value;
            const classControl: Class = {
                anoCalendario: this.getCalendar(uuiCalendar)?.ano || 0,
                calendario: this.formControl.get('calendar')?.value || '',
                curso: this.formControl.get('course')?.value || '',
                linkSala: this.formControl.get('link')?.value || '',
                nomeCurso: this.getNameCouse(uuidCourse) || '',
                nomeCentro: this.getNameSpirit(uuidSpirit) || '',
                semestreCalendario:
                    this.getCalendar(uuiCalendar)?.semestre || 0,
                uuidCentro: this.formControl.get('spirit')?.value || '',
            };

            this.classService.post(classControl).subscribe({
                next: async () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Sucesso',
                        detail: 'Turma criada com sucesso!',
                    });
                    setTimeout(() => {
                        this.router.navigate(['/admin/turmas']);
                    }, 2000);
                },
                error: (error) => {
                    console.error(error);
                },
            });
        } else {
            this.messageService.add({
                severity: 'warn',
                summary: 'Erro',
                detail: 'Todos os campos devem ser preenchidos',
            });
        }
    }

    /**
     *
     * @param uuid
     */
    getNameCouse(uuid: string): string | undefined {
        for (const course of this.courses || []) {
            if (course.uuid === uuid) {
                return course.nome;
            }
        }
        return undefined; // Retorna undefined se nenhum curso for encontrado
    }

    /**
     *
     * @param uuid
     */
    getNameSpirit(uuid: string): string | undefined {
        for (const spirit of this.SpiritCenter || []) {
            if (spirit.uuid === uuid) {
                return spirit.nome;
            }
        }
        return undefined; // Retorna undefined se nenhum curso for encontrado
    }

    getCalendar(uuid: string): Calendar | undefined {
        for (const calendar of this.calendars || []) {
            if (calendar.uuid === uuid) {
                return calendar;
            }
        }
        return undefined; // Retorna undefined se nenhum curso for encontrado
    }

    /**
     * Método que atualiza a turma com base no ID da turma.
     *
     * Este método verifica se existe um ID de turma (`idClass`). Se o ID estiver presente,
     * ele chama o serviço `classService` para obter os dados da turma correspondente.
     * Em seguida, os dados da turma são configurados no formulário (`formControl`).
     */
    isUpdateClass(): void {
        // Verifica se existe um ID de turma
        if (this.idClass) {
            // Chama o serviço para obter os dados da turma com o ID fornecido
            this.classService.get(this.idClass).subscribe({
                // Se a chamada for bem-sucedida, configura os dados da turma no formulário
                next: (classRow: Class) => {
                    this.classRow = classRow;  // Armazena os dados da turma na variável de instância
                    this.getCalendars(classRow.uuidCentro);
                    this.formControl.setValue({
                        course: classRow.curso,
                        spirit: classRow.uuidCentro,
                        calendar: classRow.calendario,
                        link: classRow.linkSala
                    });
                    this.calendarVisible = true;
                },
                // Se ocorrer um erro, exibe-o no console
                error: (error) => console.error(error),
            });
        }
    }

    updateClass(): void {
        if (!this.classRow) {
            console.error('Class data not loaded');
            return;
        }

        // Obtenha os valores do formulário
        const course = this.formControl.get('course')?.value;
        const spirit = this.formControl.get('spirit')?.value;
        const calendar = this.formControl.get('calendar')?.value;
        const link = this.formControl.get('link')?.value;
        const nomeCurso = this.getNameCouse(course)
        const nomeCentro = this.getNameSpirit(spirit)

        // Organize o objeto Class
        const updatedClass: Class = {
            ...this.classRow,  // Objeto original obtido do serviço
            curso: course,
            nomeCurso: nomeCurso || "" , // Se 'nomeCurso' for o mesmo que 'curso'
            uuidCentro: spirit,
            nomeCentro: nomeCentro || "" , // Se 'nomeCentro' for o mesmo que 'uuidCentro'
            calendario: calendar,
            linkSala: link
        };

        this.classService.put(updatedClass).subscribe({
            next: async (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Turma atualizada com sucesso!',
                });
                setTimeout(() => {
                    this.router.navigate(['/admin/turmas']);
                }, 2000);
            },
            // Se ocorrer um erro, exibe-o no console
            error: (error) => console.error(error),
        })
    }

}

import { Component, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormBuilder,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';


// Models
import { Course } from '../../../models/course';
import { SpiritCenter } from '../../../models/spiritCenter';
import { Calendar } from '../../../models/calendar';

// Services
import { CourseSerivce } from '../../../services/course/course.service';
import { SpiritCenterService } from '../../../services/spirit-center/spirit-center.service';
import { CalendarService } from '../../../services/calendar/calendar.service';
import { ClassService } from '../../../services/class/class.service';

// PrimeNg
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Class } from '../../../models/class';

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

    /**
     *
     * @param formBuilder
     * @param courseService
     * @param spiritCenterService
     * @param calendarService
     * @param messageService
     * @param classService
     * @param router
     */
    constructor(
        private formBuilder: FormBuilder,
        private courseService: CourseSerivce,
        private spiritCenterService: SpiritCenterService,
        private calendarService: CalendarService,
        private messageService: MessageService,
        private classService: ClassService,
        private router: Router
    ) {}

    /**
     *
     */
    ngOnInit(): void {
        this.initializeForm();

        this.getCourses();

        this.getSpiritCenter();

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
        localStorage.removeItem('courseInfo');
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
        // d406e65f-ea66-474e-a3fc-6d9d6a67fe47
        // centro 84d13166-39cf-11ed-9067-706979ac0e21
        // calendario 46d10106-3aab-478d-900a-6057287b8558
        //console.log(this.courses);
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

            console.log(classControl);
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
        console.log(uuid);
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
}

import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
    FormsModule,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Services
import { PeopleService } from '../../../../services/people/people.service';
import { UtilsService } from '../../../../services/utilities/auxiliary/utils.service';

// Models
import { People } from '../../../../models/people';
import { Languages } from '../../../../models/languages';

// PrimeNg
import { Button, ButtonDirective } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { Ripple } from 'primeng/ripple';
import { InputGroupModule } from 'primeng/inputgroup';
import { DropdownModule } from 'primeng/dropdown';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        Button,
        ButtonDirective,
        CalendarModule,
        CardModule,
        InputTextModule,
        Ripple,
        RouterLink,
        InputGroupModule,
        DropdownModule,
    ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.less',
})
export class ProfileComponent implements OnInit {
    /** @idPerson string **/
    public idPerson = this.route.snapshot.paramMap.get('id');

    userForm: FormGroup = new FormGroup({});

    isUpdate: boolean = false;

    public namePerson: string = '';

    // ----------------------------
    // BehaviorSubject para gerenciar o estado dos institutos
    private languagesSubject = new BehaviorSubject<any[]>([]);

    // Array para armazenar os Idiomas disponíveis
    languages: Languages[] | undefined;

    // Observable para os Idiomas
    languages$ = this.languagesSubject.asObservable();

    constructor(
        private fb: FormBuilder,
        private peopleService: PeopleService,
        private route: ActivatedRoute,
        private utilsService: UtilsService,
    ) {}

    ngOnInit() {
        this.initializeForm();
        this.getPerson();
        this.loadAvailableLanguages();


    }

    initializeForm(): void {
        this.userForm = this.fb.group({
            uuid: [{ value: '', disabled: true }],
            uuidCentro: [{ value: '', disabled: true }],
            nome: [{ value: '', disabled: true }, Validators.required],
            dataNascimento: [
                { value: '', disabled: true },
                Validators.required,
            ],
            contato: this.fb.group({
                telefone: [{ value: '', disabled: true }, Validators.required],
                email: [
                    { value: '', disabled: true },
                    [Validators.required, Validators.email],
                ],
                facebook: [{ value: '', disabled: true }],
                instagram: [{ value: '', disabled: true }],
            }),
            endereco: this.fb.group({
                logradouro: [
                    { value: '', disabled: true },
                    Validators.required,
                ],
                numero: [{ value: '', disabled: true }, Validators.required],
                bairro: [{ value: '', disabled: true }, Validators.required],
                codigoPostal: [
                    { value: '', disabled: true },
                    Validators.required,
                ],
                localidade: this.fb.group({
                    pais: [{ value: '', disabled: true }, Validators.required],
                    estado:[{ value: '', disabled: true }, Validators.required],
                    idCidade: [{ value: '', disabled: true }, Validators.required],
                })
            }),
            idioma: [{ value: '', disabled: true }, Validators.required],
        });
    }

    getPerson(): void {
        if (this.idPerson)
            this.peopleService
                .get(this.idPerson)
                .pipe(
                    catchError(
                        this.handleServiceError('buscando pessoas por uuid'),
                    ),
                )
                .subscribe((person: People) => {
                    console.log(person);
                    this.namePerson = person.nome;
                    this.userForm.patchValue({
                        uuid: person.uuid,
                        uuidCentro: person.uuidCentro,
                        nome: person.nome,
                        dataNascimento: this.formatDate(person.dataNascimento),
                        contato: person.contato,
                        endereco: person.endereco,
                        idioma: person.idioma,
                    });
                });
    }

    formatDate(date: string): string {
        const [year, month, day] = date.split('-');
        return `${month}/${day}/${year}`;
    }

    enableField(): void {
        this.userForm.enable();
        this.isUpdate = true;
        // const control = this.userForm.get(field);
        // if (control) {
        //     control.enable();
        //     control.updateValueAndValidity();
        //     this.isUpdate = true;
        // }
    }

    onSubmit() {
        this.peopleService
            .update(this.userForm.value)
            .pipe(
                catchError(
                    this.handleServiceError('buscando pessoas por uuid'),
                ),
            )
            .subscribe((response: any) => {
                console.log('Dados do usuário atualizados:', response);
                this.isUpdate = false;
                this.userForm.disable();
            });

        if (this.userForm.valid) {
            this.peopleService
                .update(this.userForm.value)
                .pipe(
                    catchError(
                        this.handleServiceError('buscando pessoas por uuid'),
                    ),
                )
                .subscribe((response: any) => {
                    this.isUpdate = false;
                    this.userForm.disable();
                });

            // Aqui você pode chamar um serviço para salvar os dados atualizados
        } else {
            this.isUpdate = false;
            this.userForm.disable();
        }
    }

    /**
     * Carrega os institutos e os idiomas disponíveis.
     */
    private loadAvailableLanguages(): void {
        this.utilsService.getLanguages().subscribe({
            next: async (languages) => {
                this.updateLanguages(languages);
            },
            error: (error) => console.error(error),
        });

        // Inscreve-se no Observable institutes$ para monitorar alterações
        this.languages$.subscribe(languages => {
            // Atualiza a lista de institutos quando ocorrem alterações
            this.languages = languages;
        });

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
     * Cria um operador `catchError` reutilizável para o tratamento de erros.
     * @param context Contexto da operação que está sendo realizada (ex: 'fetching spirit centers')
     * @returns Um operador `catchError`
     */
    private handleServiceError(context: string) {
        return (error: any) => {
            console.error(`Error ${context}:`, error);
            return throwError(() => new Error(`Error ${context}`));
        };
    }
}

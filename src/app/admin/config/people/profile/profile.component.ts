import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
    FormsModule,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

// Services
import { PeopleService } from '../../../../services/people/people.service';

// Models
import { People } from '../../../../models/people';

// PrimeNg
import { Button, ButtonDirective } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { Ripple } from 'primeng/ripple';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {InputGroupModule} from "primeng/inputgroup";

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
    ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.less',
})
export class ProfileComponent implements OnInit {
    public idPerson = this.route.snapshot.paramMap.get('id');

    userForm: FormGroup = new FormGroup({});

    constructor(
        private fb: FormBuilder,
        private peopleService: PeopleService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.initializeForm();
        this.getPerson();
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
                idCidade: [{ value: '', disabled: true }, Validators.required],
                idioma: [{ value: '', disabled: true }, Validators.required],
            }),
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
                    this.userForm.patchValue({
                        uuid: person.uuid,
                        uuidCentro: person.uuidCentro,
                        nome: person.nome,
                        dataNascimento: this.formatDate(person.dataNascimento),
                        contato: person.contato,
                        endereco: person.endereco,
                    });
                });
    }

    formatDate(date: string): string {
        const [year, month, day] = date.split('-');
        return `${month}/${day}/${year}`;
    }

    enableField(field: string): void {
        const control = this.userForm.get(field);
        if (control) {
            control.enable();
            control.updateValueAndValidity();
        }
    }

    onSubmit() {
        if (this.userForm.valid) {
            console.log('Dados do usuário atualizados:', this.userForm.value);
            // Aqui você pode chamar um serviço para salvar os dados atualizados
        } else {
            console.log('Formulário inválido', this.userForm.value);
        }
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

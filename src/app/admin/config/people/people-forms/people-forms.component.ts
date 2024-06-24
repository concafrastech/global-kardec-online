/**
 *
 * Todos os direitos pertencem à Concafras.
 *
 * Portal da Concafras: https://portal.concafras.com/
 */

import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RouterLink } from '@angular/router';
import { People } from '../../../../models/people';
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";

@Component({
    selector: 'app-people-forms',
    standalone: true,
    imports: [
        ButtonModule,
        RippleModule,
        RouterLink,
        CardModule,
        InputTextModule,
        ReactiveFormsModule,
        CalendarModule,
        FormsModule,
    ],
    templateUrl: './people-forms.component.html',
    styleUrl: './people-forms.component.less',
})
export class PeopleFormsComponent implements OnInit {
    people: People;

    constructor() {
        this.people = {
            nome: '',
            dataNascimento: '',
            contato: {
                email: '',
                telefone: '',
                facebook: '',
                instagram: '',
            },
            endereco: {
                logradouro: '',
                numero: '',
                bairro: '',
                codigoPostal: '',
                cidade: {
                    nome: '',
                    estado: {
                        nome: '',
                        pais: {
                            nome: '',
                        },
                    },
                },
            },
            nomeIdioma: '',
            usuario: {
                loginEmail: '',
                loginTelefone: '',
            },
        };
    }

    ngOnInit() {}
}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import {Button, ButtonDirective} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {Ripple} from "primeng/ripple";
import {RouterLink} from "@angular/router";



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
    ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.less',
})
export class ProfileComponent implements OnInit {
    userForm: FormGroup = new FormGroup({});

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.userForm = this.fb.group({
            uuid: ['3fa85f64-5717-4562-b3fc-2c963f66afa6'],
            uuidCentro: ['3fa85f64-5717-4562-b3fc-2c963f66afa6'],
            nome: ['Nome Exemplo', Validators.required],
            dataNascimento: ['2024-06-25', Validators.required],
            contato: this.fb.group({
                telefone: ['123456789', Validators.required],
                email: [
                    'exemplo@dominio.com',
                    [Validators.required, Validators.email],
                ],
                facebook: ['facebook.com/exemplo'],
                instagram: ['instagram.com/exemplo'],
            }),
            endereco: this.fb.group({
                logradouro: ['Rua Exemplo', Validators.required],
                numero: ['123', Validators.required],
                bairro: ['Bairro Exemplo', Validators.required],
                codigoPostal: ['12345-678', Validators.required],
                idCidade: [1, Validators.required],
                idioma: [ '', Validators.required,],
            }),
        });
    }

    onSubmit() {
        if (this.userForm.valid) {
            console.log('Dados do usuário atualizados:', this.userForm.value);
            // Aqui você pode chamar um serviço para salvar os dados atualizados
        } else {
            console.log('Formulário inválido', this.userForm.value);
        }
    }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

// Services
import { SpiritCenterService } from '../../../services/spirit-center/spirit-center.service';
import { PeopleService } from '../../../services/people/people.service';

// Model
import { SpiritCenter } from '../../../models/spiritCenter';
import { People } from '../../../models/people';

// PrimeNG
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Table } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

interface PeopleResponse {
    content: People[];
}

@Component({
    selector: 'app-people',
    standalone: true,
    imports: [
        ButtonModule,
        RippleModule,
        CardModule,
        AccordionModule,
        NgForOf,
        TableModule,
        RouterLink,
        ButtonModule,
        ToastModule,
        IconFieldModule,
        InputIconModule,
        DialogModule,
    ],
    templateUrl: './people.component.html',
    styleUrl: './people.component.less',
    providers: [MessageService],
})
export class PeopleComponent implements OnInit {
    @ViewChild('dt2') dt2!: Table; // Assumindo que o componente p-table do PrimeNG se chama Table

    public peopleList: (PeopleResponse | {})[] = [];

    public spiritCenters: SpiritCenter[] = [];

    selectedSpiritCenter: SpiritCenter | undefined; // Para manter o centro espiritual selecionado

    visible: boolean = false;

    public nameCenter: string = '';

    constructor(
        private _spiritCenter: SpiritCenterService,
        private messageService: MessageService,
        private _peopleService: PeopleService,
    ) {}

    ngOnInit() {
        this.getAllSpiritCenter();
    }

    /**
     *
     * @private
     */
    private getAllSpiritCenter() {
        this._spiritCenter
            .getAllSpiritsCenter()
            .pipe(
                catchError(this.handleServiceError('fetching spirit centers')),
            )
            .subscribe(
                (response: SpiritCenter[]) => {
                    this.spiritCenters = response;
                },
                (error) => {
                    console.error('Error fetching spirit centers:', error);
                },
            );
    }

    /**
     * Filtra a tabela pela pesquisa
     * @param value
     */
    filterTable(value: string) {
        this.dt2.filterGlobal(value, 'contains');
    }

    /**
     *
     * @param spiritCenter
     */
    onRowSelect(spiritCenter: SpiritCenter) {
        if (spiritCenter.uuid) this.showPeople(spiritCenter.uuid, spiritCenter.nome);
    }

    /**
     *
     * @param spiritCenter
     */
    onRowUnselect(spiritCenter: SpiritCenter) {
        if (spiritCenter.uuid) this.showPeople(spiritCenter.uuid, spiritCenter.nome);
    }

    /**
     *
     * @param uuid
     */
    showPeople(uuid: string, nome: string) {
        this.getPeopleByCenter(uuid, nome);
    }

    private getPeopleByCenter(uuid: string, nameCenter: string): void {
       this.nameCenter = nameCenter;
        this._peopleService
            .getBySpiritCenter(uuid)
            .pipe(
                catchError(
                    this.handleServiceError('fetching people by center'),
                ),
            )
            .subscribe((response: PeopleResponse) => {
                const people = response.content;

                console.log(people);

                if (people.length > 0) {
                    this.peopleList = people;
                    this.visible = true;
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erro',
                        detail: 'Todos os campos são obrigatórios',
                    });
                }
            });
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

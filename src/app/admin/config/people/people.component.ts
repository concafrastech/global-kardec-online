import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { throwError} from 'rxjs';

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
    ],
    templateUrl: './people.component.html',
    styleUrl: './people.component.less',
    providers: [MessageService],
})
export class PeopleComponent implements OnInit {
    public peopleList: (PeopleResponse | {})[] = [];

    public spiritCenters: SpiritCenter[] = [];

    constructor(
        private _spiritCenter: SpiritCenterService,
        private messageService: MessageService,
        private _peopleService: PeopleService,
    ) {}

    ngOnInit() {
         this.getAllSpiritCenter();
    }
    getAllSpiritCenter() {
        this._spiritCenter.getAllSpiritsCenter()
                .pipe(
                    catchError(this.handleServiceError('fetching spirit centers')),
                )
            .subscribe(
                (response: SpiritCenter[]) => {
                    console.log(response);
                    this.spiritCenters = response;
                },
                (error) => {
                    console.error('Error fetching spirit centers:', error);
                    // Aqui você pode adicionar tratamento de erro adicional, se necessário
                }
            )
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

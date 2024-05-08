import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { Calendar } from '../../../models/calendar';
import { SpiritCenter } from '../../../models/spiritCenter';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-calendar-new',
    standalone: true,
    imports: [
        ButtonModule,
        RippleModule,
        RouterLink,
        InputTextModule,
        FormsModule,
    ],
    templateUrl: './calendar-new.component.html',
    styleUrl: './calendar-new.component.less',
})
export class CalendarNewComponent implements OnInit {
    calendar: Calendar;
    spiritCenter: SpiritCenter;

    constructor() {
        this.calendar = {
            uuidCentro: '',
            semestre: 0,
            ano: 0,
            diasAula: [],
        };
        this.spiritCenter = {
            nome: '',
            cidade: '',
            estado: '',
        };
    }

    ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { Calendar } from '../../../models/calendar';
import { SpiritCenter } from '../../../models/spiritCenter';
import { SpiritCenterService } from '../../../services/spirit-center/spirit-center.service';
import { DropdownDefault } from '../../../models/utils/dropdownDefault';
import { DiaAula } from '../../../models/diaAula';
import { UtilsService } from '../../../services/utilities/auxiliary/utils.service';

@Component({
    selector: 'app-calendar-new',
    standalone: true,
    imports: [
        ButtonModule,
        RippleModule,
        RouterLink,
        InputTextModule,
        FormsModule,
        DropdownModule,
        InputNumberModule,
        DialogModule,
        CalendarModule,
        CheckboxModule,
        NgForOf,
    ],
    templateUrl: './calendar-new.component.html',
    styleUrl: './calendar-new.component.less',
})
export class CalendarNewComponent implements OnInit {
    calendar: Calendar;
    spiritCenter: SpiritCenter;
    selectedSpiritCenter: DropdownDefault | undefined;
    spiritCenters: DropdownDefault[] | undefined;
    selectedTypeDayCalendar: DropdownDefault | undefined;
    typesDaysCalendar: DropdownDefault[] | undefined;
    visible: boolean;
    diaAula: DiaAula;

    constructor(
        private _spiritCenterService: SpiritCenterService,
        private _utilsService: UtilsService,
    ) {
        // Variável que representa o calendário
        this.calendar = {
            uuidCentro: '',
            semestre: 0,
            ano: 0,
            diasAula: [],
        };

        // Variável que representa o Centro Espírita
        this.spiritCenter = {
            uuid: '',
            nome: '',
            cidade: '',
            estado: '',
        };

        this.diaAula = {
            dataAula: '',
            idTipoDiaCalendario: 0,
            nomeTipoDiaCalendario: '',
            aulaEspecial: false,
        };

        // Array de Centros Espíritas
        this.spiritCenters = [];

        // Array de tipos de dias do calendário
        this.typesDaysCalendar = [];

        // Variável flag para controlar dialog.
        this.visible = false;
    }

    ngOnInit(): void {
        this.getAllSpiritCenters();
    }

    /**
     * Função destinada a retornar todos os Centros Espíritas registrados
     *
     * @return void
     */
    getAllSpiritCenters(): void {
        this._spiritCenterService
            .getAllSpiritsCenter()
            .subscribe((spiritCenters: SpiritCenter[]): void => {
                let spiritCentersTemp: DropdownDefault[] = [];
                spiritCenters.forEach((spiritCenter: SpiritCenter): void => {
                    let spiritCenterSplit = spiritCenter.nome.split(' ');
                    let code = '';
                    spiritCenterSplit.forEach((part: any) => {
                        if (code.length <= 3) {
                            code += part.charAt(0).toUpperCase();
                        }
                    });
                    spiritCentersTemp.push(<DropdownDefault>{
                        uuid: spiritCenter.uuid,
                        name: spiritCenter.nome,
                        code: code,
                    });
                });
                this.spiritCenters = spiritCentersTemp;
                this.getTypesDaysCalendar();
            });
    }

    getTypesDaysCalendar(): void {
        this._utilsService.getTypeDaysCalendar().subscribe((response: any) => {
            let typesDaysCalendarTmp: DropdownDefault[] = [];
            response.forEach((typeDayCalendar: any) => {
                typesDaysCalendarTmp.push(<DropdownDefault>{
                    uuid: typeDayCalendar.id,
                    name: typeDayCalendar.nome,
                    code: typeDayCalendar.nome.replaceAll(' ', '_'),
                });
            });
            this.typesDaysCalendar = typesDaysCalendarTmp;
        });
    }

    addTypesDaysCalendar(): void {
        this.calendar.diasAula.push(this.diaAula);
        this.visible = false;
    }

    showDialog() {
        this.visible = true;
    }

    onSubmit(): void {
        if (this.selectedSpiritCenter?.uuid == undefined) {
            console.log('Falhou');
            return;
        }

        if (this.calendar.ano.toString().length < 4) {
            console.log('Ano incorreto.');
            return;
        }

        if (this.calendar.semestre < 1 || this.calendar.semestre > 2) {
            console.log('Semestre incorreto.');
            return;
        }

        this.calendar.uuidCentro = <string>this.selectedSpiritCenter?.uuid;
        console.log(this.calendar);
        console.log(this.diaAula);
    }
}

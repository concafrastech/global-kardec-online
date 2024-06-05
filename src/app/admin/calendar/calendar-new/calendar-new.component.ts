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
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Calendar } from '../../../models/calendar';
import { SpiritCenter } from '../../../models/spiritCenter';
import { SpiritCenterService } from '../../../services/spirit-center/spirit-center.service';
import { DropdownDefault } from '../../../models/utils/dropdownDefault';
import { DiaAula } from '../../../models/diaAula';
import { UtilsService } from '../../../services/utilities/auxiliary/utils.service';
import { CalendarService } from '../../../services/calendar/calendar.service';

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
        TableModule,
        ToastModule,
        ConfirmDialogModule,
    ],
    templateUrl: './calendar-new.component.html',
    styleUrl: './calendar-new.component.less',
    providers: [
        SpiritCenterService,
        MessageService,
        ConfirmationService,
        CalendarService,
    ],
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
        private _messageService: MessageService,
        private _confirmationService: ConfirmationService,
        private _calendarService: CalendarService,
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
            dataAula: new Date(),
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

    prepareDataDiaAula(): void {
        this.diaAula.dataAula = new Date(this.diaAula.dataAula);
        this.diaAula.idTipoDiaCalendario = <number>(
            this.selectedTypeDayCalendar?.uuid
        );
        this.diaAula.nomeTipoDiaCalendario = this.selectedTypeDayCalendar?.name;
        this.selectedTypeDayCalendar = undefined;
    }

    addTypesDaysCalendar(): void {
        this.prepareDataDiaAula();
        this.calendar.diasAula.push({
            dataAula: this.diaAula.dataAula,
            idTipoDiaCalendario: this.diaAula.idTipoDiaCalendario,
            nomeTipoDiaCalendario: this.diaAula.nomeTipoDiaCalendario,
            aulaEspecial: this.diaAula.aulaEspecial,
        });
        this.diaAula = {
            dataAula: new Date(),
            idTipoDiaCalendario: 0,
            nomeTipoDiaCalendario: '',
            aulaEspecial: false,
        };
        this.visible = false;
    }

    showDialog() {
        this.visible = true;
    }

    onSubmit(): void {
        this._messageService.clear();

        if (this.selectedSpiritCenter?.uuid == undefined) {
            this._messageService.add({
                severity: 'error',
                summary: 'Falha',
                detail: 'Selecione um centro espírita.',
            });
            return;
        }

        if (this.calendar.ano.toString().length < 4) {
            this._messageService.add({
                severity: 'error',
                summary: 'Falha',
                detail: 'Ano incorreto. Digite o ano com 4 digitos.',
            });
            return;
        }

        if (this.calendar.semestre < 1 || this.calendar.semestre > 2) {
            this._messageService.add({
                severity: 'error',
                summary: 'Falha',
                detail: 'Semestre incorreto. Digite 1 ou 2.',
            });
            return;
        }

        if (this.calendar.diasAula.length == 0) {
            this._messageService.add({
                severity: 'error',
                summary: 'Falha',
                detail: 'Adicione pelo menos 1 dia.',
            });
            return;
        }

        this.calendar.uuidCentro = <string>this.selectedSpiritCenter?.uuid;

        this._calendarService
            .createCalendar(this.calendar)
            .subscribe((response: any) => {
                console.log(response);
            });
    }

    onConfirmDialog(event: Event, index: number) {
        console.log(index);
        this._confirmationService.confirm({
            target: event.target as EventTarget,
            message:
                'Tem certeza que deseja continuar? Essa ação irá remover a data.',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon: 'none',
            rejectIcon: 'none',
            rejectButtonStyleClass: 'p-button-text',
            accept: () => {
                this.calendar.diasAula.splice(index, 1);
                console.log(this.calendar.diasAula);
                this._messageService.add({
                    severity: 'info',
                    summary: 'Confirmado',
                    detail: 'Você aceitou a deletar a data.',
                });
            },
            reject: () => {
                this._messageService.add({
                    severity: 'error',
                    summary: 'Rejeitado',
                    detail: 'Você não aceitou deletar a data.',
                    life: 3000,
                });
            },
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { KeyValuePipe, NgForOf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SpiritCenterService } from '../../../services/spirit-center/spirit-center.service';
import { CalendarService } from '../../../services/calendar/calendar.service';
import { SpiritCenter } from '../../../models/spiritCenter';
import { Calendar } from '../../../models/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-calendar-dashboard',
    standalone: true,
    imports: [
        ButtonModule,
        RippleModule,
        RouterLink,
        TableModule,
        NgForOf,
        KeyValuePipe,
        ToastModule,
        ConfirmDialogModule,
        CardModule
    ],
    templateUrl: './calendar-dashboard.component.html',
    styleUrl: './calendar-dashboard.component.less',
    providers: [
        CalendarService,
        SpiritCenterService,
        MessageService,
        ConfirmationService,
    ],
})
export class CalendarDashboardComponent implements OnInit {
    calendarsBySpiritCenter: Map<string, Calendar[]>;

    constructor(
        private _calendarService: CalendarService,
        private _spiritCenter: SpiritCenterService,
        private _messageService: MessageService,
        private _confirmationService: ConfirmationService,
        private _router: Router,
    ) {
        this.calendarsBySpiritCenter = new Map();
    }

    ngOnInit(): void {
        this.getCalendarsBySpiritCenter();
    }

    getCalendarsBySpiritCenter() {
        this._spiritCenter
            .getAllSpiritsCenter()
            .subscribe((scs: SpiritCenter[]) => {
                scs.forEach((sc: SpiritCenter) => {
                    this._calendarService
                        .getCalendarBySpiritCenter(<string>sc.uuid)
                        .subscribe((calendar: Calendar[]) => {
                            if (calendar.length > 0) {
                                this.calendarsBySpiritCenter.set(
                                    sc.nome,
                                    calendar,
                                );
                            }
                        });
                });
            });
    }

    onConfirmDialog(event: Event, index: number, key: any) {
        this._confirmationService.confirm({
            target: event.target as EventTarget,
            message:
                'Tem certeza que deseja continuar? Essa ação irá remover o calendário.',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon: 'none',
            rejectIcon: 'none',
            rejectButtonStyleClass: 'p-button-text',
            accept: () => {
                // this.calendar.diasAula.splice(index, 1);
                let calendars: Calendar[] = [];
                this.calendarsBySpiritCenter
                    .get(key)
                    ?.forEach((calendar: Calendar) => {
                        calendars.push(calendar);
                    });
                let uuid: string | undefined = calendars[index].uuid;
                this._calendarService.deleteCalendar(uuid).subscribe({
                    next: () => {
                        this._messageService.add({
                            severity: 'info',
                            summary: 'Confirmado',
                            detail: 'Você aceitou a deletar o calendário. Recarrecando a página em 2 segundos.',
                        });
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    },
                    error: () => {
                        this._messageService.add({
                            severity: 'error',
                            summary: 'Rejeitado',
                            detail: 'Calendário está vinculado a uma turma.',
                            life: 3000,
                        });
                    },
                });
            },
            reject: () => {
                this._messageService.add({
                    severity: 'error',
                    summary: 'Rejeitado',
                    detail: 'Você não aceitou deletar o calendário.',
                    life: 3000,
                });
            },
        });
    }
}

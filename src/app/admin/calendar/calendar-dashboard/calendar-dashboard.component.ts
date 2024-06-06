import { Component, OnInit } from '@angular/core';
import { KeyValuePipe, NgForOf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { SpiritCenterService } from '../../../services/spirit-center/spirit-center.service';
import { CalendarService } from '../../../services/calendar/calendar.service';
import { SpiritCenter } from '../../../models/spiritCenter';
import { Calendar } from '../../../models/calendar';

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
    ],
    templateUrl: './calendar-dashboard.component.html',
    styleUrl: './calendar-dashboard.component.less',
})
export class CalendarDashboardComponent implements OnInit {
    calendarsBySpiritCenter: Map<string, Calendar[]>;

    constructor(
        private _calendarService: CalendarService,
        private _spiritCenter: SpiritCenterService,
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
}

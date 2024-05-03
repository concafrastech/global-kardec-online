import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../../services/calendar/calendar.service';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'app-calendar-dashboard',
    standalone: true,
    imports: [ButtonModule, RippleModule],
    templateUrl: './calendar-dashboard.component.html',
    styleUrl: './calendar-dashboard.component.less',
})
export class CalendarDashboardComponent implements OnInit {
    constructor(
        private _calendarService: CalendarService,
        private _router: Router,
    ) {}

    ngOnInit(): void {}

    goTo(route: string): void {
        this._router.navigate([route]);
    }
}

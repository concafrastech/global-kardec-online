import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../../services/calendar/calendar.service';

@Component({
    selector: 'app-calendar-dashboard',
    standalone: true,
    imports: [],
    templateUrl: './calendar-dashboard.component.html',
    styleUrl: './calendar-dashboard.component.less',
})
export class CalendarDashboardComponent implements OnInit {
    constructor(private _calendarService: CalendarService) {}

    ngOnInit(): void {}
}

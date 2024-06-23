import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RouterLink } from '@angular/router';
import {CardModule} from "primeng/card";

@Component({
    selector: 'app-people',
    standalone: true,
    imports: [ButtonModule, RippleModule, RouterLink, CardModule],
    templateUrl: './people.component.html',
    styleUrl: './people.component.less',
})
export class PeopleComponent implements OnInit {
    ngOnInit() {}
}

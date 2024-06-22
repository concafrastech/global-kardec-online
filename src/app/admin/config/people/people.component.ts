import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-people',
    standalone: true,
    imports: [ButtonModule, RippleModule, RouterLink],
    templateUrl: './people.component.html',
    styleUrl: './people.component.less',
})
export class PeopleComponent implements OnInit {
    ngOnInit() {}
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        ButtonModule,
        RouterOutlet,
        DialogModule,

    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.less'
})
export class AppComponent {
    title = 'global-kardec-online';
    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }
}

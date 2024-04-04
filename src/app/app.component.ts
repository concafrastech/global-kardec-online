import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.less',
})
export class AppComponent implements OnInit {
    title = 'global-kardec-online';
    visible: boolean = false;

    constructor() {}

    ngOnInit(): void {}

    showDialog() {
        this.visible = true;
    }
}

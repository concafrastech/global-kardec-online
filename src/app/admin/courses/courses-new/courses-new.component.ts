import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';



@Component({
    selector: 'app-courses-new',
    standalone: true,
    imports: [ButtonModule, InputTextModule, InputTextareaModule],
    templateUrl: './courses-new.component.html',
    styleUrl: './courses-new.component.less'
})
export class CoursesNewComponent implements OnInit {
    formGroup: FormGroup | undefined;

    ngOnInit(): void {
        this.formGroup = new FormGroup({
            name: new FormControl<string | null>(null),
            institute: new FormControl<string | null>(null),
            language: new FormControl<string | null>(null),
            description: new FormControl<string | null>(null)
        });
    }

}

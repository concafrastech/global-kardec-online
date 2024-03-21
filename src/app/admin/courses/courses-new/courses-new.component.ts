import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TabViewModule } from 'primeng/tabview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';




@Component({
    selector: 'app-courses-new',
    standalone: true,
    imports: [
        ButtonModule,
        InputTextModule,
        InputTextareaModule,
        TabViewModule,
        ConfirmDialogModule
    ],
    templateUrl: './courses-new.component.html',
    styleUrl: './courses-new.component.less',
    providers: [ConfirmationService, MessageService]

})
export class CoursesNewComponent implements OnInit {
    formGroup: FormGroup | undefined;
    closableClass: boolean = false;

    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) { }


    ngOnInit(): void {
        this.formGroup = new FormGroup({
            name: new FormControl<string | null>(null),
            institute: new FormControl<string | null>(null),
            language: new FormControl<string | null>(null),
            description: new FormControl<string | null>(null)
        });
    }

    deleteTheClass(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: "p-button-danger p-button-text",
            rejectButtonStyleClass: "p-button-text p-button-text",
            acceptIcon: "none",
            rejectIcon: "none",

            accept: () => {
                this.closableClass = true;
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            }
        });
    }

}

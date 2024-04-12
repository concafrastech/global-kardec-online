import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-upload',
    standalone: true,
    imports: [FileUploadModule, ToastModule, CommonModule],
    providers: [MessageService],
    templateUrl: './upload.component.html',
    styleUrl: './upload.component.less'
})


export class UploadComponent {

    constructor(private messageService: MessageService) { }

    onUpload(event: FileSelectEvent) {
        // Captura do arquivo
        var file: File = event.files[0];
        // Converter arquivo para base64
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => localStorage.setItem('photo', JSON.stringify(reader.result));

        this.messageService.add({ severity: 'success', summary: 'Completo', detail: 'Upload da imagem realizado!' });

    }
}

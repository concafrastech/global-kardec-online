import { Component, ViewChild } from '@angular/core';
import { FileSelectEvent, FileUploadModule, FileUpload } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
    selector: 'app-upload-image',
    standalone: true,
    imports: [FileUploadModule, ToastModule],
    templateUrl: './upload-image.component.html',
    styleUrl: './upload-image.component.less',
    providers: [MessageService]
})
export class UploadImageComponent {

    @ViewChild('fileUpload') fileUploadComponent: FileUpload | undefined;
    base64Result: any;
    constructor(private messageService: MessageService) { }

    onError(event: any) {
        const errorMessage = (event.files ?? [])[0]?.name?.toLowerCase();
        console.log(errorMessage ?? "No file name found");

        console.error(event);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'File Upload Failed' });
    }

    onUpload(event: FileSelectEvent) {
        if (event && event.files && event.files.length > 0) {
            const file: File = event.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                const base64Result = reader.result as string;

                this.base64Result = base64Result;
                console.log(base64Result);
                this.messageService.add({ severity: 'success', summary: 'Completo', detail: 'Upload da imagem realizado!' });
            };
            reader.readAsDataURL(file);
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'File Upload Failed' });
            console.log('No files selected');
        }
    }

    onClear() {
        if (this.fileUploadComponent && this.fileUploadComponent?._files.length > 0) {
            this.fileUploadComponent?.clear();
            this.base64Result = null
            this.messageService.add({ severity: 'success', summary: 'Completo', detail: 'Imagem Removida com Sucesso' });
        }
    }



}

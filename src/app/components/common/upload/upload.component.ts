import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common'; 

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [FileUploadModule, ToastModule, CommonModule],
  providers: [MessageService],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.less'
})


export class UploadComponent {
  
  uploadedFiles: any[] = [];

  constructor(private messageService: MessageService) {}

  onUpload(event:UploadEvent) {
      for(let file of event.files) {
          this.uploadedFiles.push(file);
      }

      this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }
  fileSize:number = 1000000;
}

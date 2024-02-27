import { Component, ViewChild  } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [SidebarModule, ButtonModule, AvatarModule],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.less'
})
export class AdminHomeComponent {
    @ViewChild('sidebarRef') sidebarRef!: Sidebar;

    closeCallback(e: Event): void {
        this.sidebarRef.close(e);
    }

    sidebarVisible: boolean = true;
}

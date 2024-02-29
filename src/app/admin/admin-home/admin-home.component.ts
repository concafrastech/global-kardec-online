import { Component, OnInit, ViewChild } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';


import { SidebarComponent } from '../../components/admin/dashboard/sidebar/sidebar.component';

@Component({
    selector: 'app-admin-home',
    standalone: true,
    imports: [SidebarModule, ButtonModule, MenuModule, MenubarModule, SidebarComponent],
    templateUrl: './admin-home.component.html',
    styleUrl: './admin-home.component.less'
})
export class AdminHomeComponent implements OnInit {
    @ViewChild('sidebarRef') sidebarRef!: Sidebar;

    items: MenuItem[] | undefined;
    visible: any = true;
    cols: any;

    ngOnInit() {
        this.items = [
            {
                label: 'New',
                icon: 'pi pi-fw pi-plus',
            },
            {
                label: 'Delete',
                icon: 'pi pi-fw pi-trash'
            }
        ];
       
    }
    closeCallback(e: Event): void {
        this.sidebarRef.close(e);
    }

    sidebarVisible: boolean = true;
}

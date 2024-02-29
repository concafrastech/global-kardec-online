import { Component } from '@angular/core';


import { SidebarComponent } from '../../components/admin/dashboard/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/admin/dashboard/navbar/navbar.component';

@Component({
    selector: 'app-admin-home',
    standalone: true,
    imports: [SidebarComponent, NavbarComponent],
    templateUrl: './admin-home.component.html',
    styleUrl: './admin-home.component.less'
})
export class AdminHomeComponent  {


}

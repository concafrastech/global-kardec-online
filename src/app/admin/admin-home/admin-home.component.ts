import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/admin/dashboard/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/admin/dashboard/navbar/navbar.component';
import { NavbarService } from '../../services/utilities/navbar.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-admin-home',
    standalone: true,
    imports: [CommonModule,SidebarComponent, NavbarComponent],
    templateUrl: './admin-home.component.html',
    styleUrl: './admin-home.component.less'
})
export class AdminHomeComponent  {


    constructor(public navbarService: NavbarService) { }

}

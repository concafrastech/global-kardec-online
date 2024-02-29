import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [MenubarModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.less'
})
export class NavbarComponent implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit(): void {
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

}

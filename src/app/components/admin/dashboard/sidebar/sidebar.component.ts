import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [PanelMenuModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.less',
})
export class SidebarComponent implements OnInit {
    sidebarItems: MenuItem[] | undefined;

    ngOnInit(): void {
        this.sidebarItems = [
            {
                label: 'Cursos',
                icon: 'pi pi-fw pi-book',
                items: [
                    {
                        label: 'Configuração',
                        items: [
                            {
                                label: 'Institutos',
                                icon: 'pi pi-fw pi-heart-fill',
                            },
                            {
                                label: 'Idiomas',
                                icon: 'pi pi-fw pi-language',
                            },
                            {
                                label: 'Recursos',
                                icon: 'pi pi-fw pi-box',
                            },
                        ],
                    },
                    {
                        label: 'Acessar',
                        routerLink:'/admin/cursos/',
                        icon: 'pi pi-fw pi-database'
                    },
                    {
                        label: 'Criar',
                        routerLink: '/admin/cursos/novo',
                        icon: 'pi pi-fw pi-plus-circle',
                    },
                    {
                        separator: true,
                    },
                    {
                        label: 'Exportar',
                        icon: 'pi pi-fw pi-external-link',
                    },
                ],
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    {
                        label: 'Left',
                        icon: 'pi pi-fw pi-align-left',
                    },
                    {
                        label: 'Right',
                        icon: 'pi pi-fw pi-align-right',
                    },
                    {
                        label: 'Center',
                        icon: 'pi pi-fw pi-align-center',
                    },
                    {
                        label: 'Justify',
                        icon: 'pi pi-fw pi-align-justify',
                    },
                ],
            },
            {
                label: 'Users',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-user-plus',
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-fw pi-user-minus',
                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-fw pi-users',
                        items: [
                            {
                                label: 'Filter',
                                icon: 'pi pi-fw pi-filter',
                                items: [
                                    {
                                        label: 'Print',
                                        icon: 'pi pi-fw pi-print',
                                    },
                                ],
                            },
                            {
                                icon: 'pi pi-fw pi-bars',
                                label: 'List',
                            },
                        ],
                    },
                ],
            },
            {
                label: 'Events',
                icon: 'pi pi-fw pi-calendar',
                items: [
                    {
                        label: 'Edit',
                        icon: 'pi pi-fw pi-pencil',
                        items: [
                            {
                                label: 'Save',
                                icon: 'pi pi-fw pi-calendar-plus',
                            },
                            {
                                label: 'Delete',
                                icon: 'pi pi-fw pi-calendar-minus',
                            },
                        ],
                    },
                    {
                        label: 'Archieve',
                        icon: 'pi pi-fw pi-calendar-times',
                        items: [
                            {
                                label: 'Remove',
                                icon: 'pi pi-fw pi-calendar-minus',
                            },
                        ],
                    },
                ],
            },
        ];
    }
}

import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { PanelMenuModule } from 'primeng/panelmenu';


import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [PanelMenuModule, BadgeModule, RippleModule, CommonModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.less',
})
export class SidebarComponent implements OnInit {
    sidebarItems: MenuItem[] | undefined;
    items: MenuItem[] | undefined;


    ngOnInit(): void {
        this.sidebarItems = [
            {
                label: 'Cursos',
                icon: 'pi pi-fw pi-book',
                routerLink: '/admin/cursos/',
            },
            {
                label: 'Turmas',
                icon: 'pi pi-fw pi-bookmark',
                routerLink: '/admin/turmas',
            },
            {
                label: 'Turmas em lote',
                icon: 'pi pi-fw pi-bookmark',
                routerLink: '/admin/turmas/lote',
            },
            {
                label: 'Matriculas',
                icon: 'pi pi-fw pi-check-square',
                routerLink: '/admin/matriculas',
            },
            {
                label: 'Matriculas em lote',
                icon: 'pi pi-fw pi-check-square',
                routerLink: '/admin/matriculas/lote',
            },
            {
                label: 'Semestre Letivo',
                icon: 'pi pi-fw pi-calendar',
                routerLink: '/admin/calendarios',
            },
            {
                label: 'Notificações',
                icon: 'pi pi-fw pi-comments',
                routerLink: '/admin/notificacao',
            },
            {
                label: 'Configurações',
                icon: 'pi pi-fw pi-cog',
                routerLink: '/admin/configuracao',
            },
            {
                label: 'Desconectar',
                icon: 'pi pi-fw pi-sign-out',
                routerLink: '/admin/desconectar',
            },
        ];
        this.items = [
            {
                label: 'Mail',
                icon: 'pi pi-envelope',
                badge: '5',
                items: [
                    {
                        label: 'Compose',
                        icon: 'pi pi-file-edit',
                        shortcut: '⌘+N'
                    },
                    {
                        label: 'Inbox',
                        icon: 'pi pi-inbox',
                        badge: '5'
                    },
                    {
                        label: 'Sent',
                        icon: 'pi pi-send',
                        shortcut: '⌘+S'
                    },
                    {
                        label: 'Trash',
                        icon: 'pi pi-trash',
                        shortcut: '⌘+T'
                    }
                ]
            },
            {
                label: 'Reports',
                icon: 'pi pi-chart-bar',
                shortcut: '⌘+R',
                items: [
                    {
                        label: 'Sales',
                        icon: 'pi pi-chart-line',
                        badge: '3'
                    },
                    {
                        label: 'Products',
                        icon: 'pi pi-list',
                        badge: '6'
                    }
                ]
            },
            {
                label: 'Profile',
                icon: 'pi pi-user',
                shortcut: '⌘+W',
                items: [
                    {
                        label: 'Settings',
                        icon: 'pi pi-cog',
                        shortcut: '⌘+O'
                    },
                    {
                        label: 'Privacy',
                        icon: 'pi pi-shield',
                        shortcut: '⌘+P'
                    }
                ]
            }
        ];
    }
}

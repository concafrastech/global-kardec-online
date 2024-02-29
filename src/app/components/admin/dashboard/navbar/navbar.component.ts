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
    language = 'Português'
    user = "Victor"

    ngOnInit(): void {
        this.items = [
            {
                label: `${this.language}`,
                icon: 'pi pi-fw pi-language',
                items: [
                    {
                        label: '🇧🇷 Português ',
                        url: 'pt-BR/admin/'
                    },
                    {
                        label: '🇺🇸 English ',
                        url: ''
                    },
                    {
                        label: '🇪🇸 Español',
                        url: ''
                    }
                ]
            },
            {
                label: 'Central de Ajuda',
                icon: 'pi pi-fw pi-question-circle'
            },
            {
                label: "Notificações",
                icon: 'pi pi-fw pi-bell'

            },
            {
                label: `${this.user}`,
                icon: "pi pi-fw pi-user",
                items: [
                    {
                        label: 'Mensagens',
                        icon: 'pi pi-fw pi-envelope'
                    },
                    {
                        label: 'Ajuda',
                        icon: 'pi pi-fw pi-question-circle'
                    },
                    {
                        label: 'Configurações',
                        icon: 'pi pi-fw pi-cog'
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'Sair da conta',
                        icon: 'pi pi-fw pi-sign-out',
                        
                    },
                ]
            }
        ];
    }

}

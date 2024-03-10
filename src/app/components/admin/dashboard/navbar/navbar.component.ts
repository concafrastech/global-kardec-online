import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { NavbarService } from '../../../../services/utilities/navbar.service';


@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [MenubarModule, ButtonModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.less',
})
export class NavbarComponent implements OnInit {
    items: MenuItem[] | undefined;
    language = 'Português'
    user = "Victor"
    minimize = false;

    constructor(private navbarService: NavbarService) { }



    ngOnInit(): void {
        this.items = [
            {
                label: `${this.language}`,
                icon: 'pi pi-fw pi-language',
                items: [
                    {
                        label: 'Português ', 
                        url: 'pt-BR/admin/',
                        icon: 'pt-BR'
                    },
                    {
                        label: 'English ',
                        url: '',
                        icon: 'en-US'
                    },
                    {
                        label: 'Español',
                        url: '',
                        icon: 'es'
                    }
                ]
            },
            {
                label: 'Central de Ajuda',
                icon: 'pi pi-fw pi-question-circle'
            },
            {
                label: "Notificação",
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

    changeMinimize(): void {
      if(this.navbarService.getMinimize()){
        this.navbarService.setMinimize(false)
      }else{
        this.navbarService.setMinimize(true)
      }
    }
}

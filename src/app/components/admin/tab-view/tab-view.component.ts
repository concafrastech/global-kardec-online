import { Component, OnInit } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';




@Component({
    selector: 'app-tab-view',
    standalone: true,
    imports: [
        CommonModule,
        TabViewModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        InputTextareaModule
    ],
    templateUrl: './tab-view.component.html',
    styleUrl: './tab-view.component.less'
})
export class TabViewComponent implements OnInit {

    public content: any = [
        {
            "content": ["Victor Teodoro", "Professor", "Responsável por ministrar aulas e orientar alunos."]
        },
        {
            "content": ["Victor Teodoro", "Designer Instrucional", "Desenvolve materiais didáticos e estratégias de ensino."]
        },
        {
            "content": ["Victor Teodoro", "Programador", "Responsável pelo desenvolvimento de software e aplicativos educacionais."]
        }
    ];

    ngOnInit(): void {
        console.log(this.content)
    }

    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }
}

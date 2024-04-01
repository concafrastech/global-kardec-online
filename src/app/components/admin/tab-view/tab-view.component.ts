// Importações essenciais do Angular
import { Component, OnInit } from '@angular/core'; // Funcionalidades básicas para componentes
import { CommonModule } from '@angular/common'; // Funcionalidades básicas do Angular

// Importações do PrimeNG para componentes específicos
import { TabViewModule } from 'primeng/tabview';  // Componente TabView do PrimeNG
import { ButtonModule } from 'primeng/button';    // Componente Button do PrimeNG
import { DialogModule } from 'primeng/dialog';  // Componente Dialog do PrimeNG
import { InputTextModule } from 'primeng/inputtext'; // Componente InputText do PrimeNG
import { InputTextareaModule } from 'primeng/inputtextarea'; // Componente InputTextarea do PrimeNG
// ... outros imports do PrimeNG conforme a necessidade

// Importações relacionadas a formulários do Angular
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Módulos básicos para formulários
import { FormBuilder } from '@angular/forms'; // Serviço para construir formulários reativos
import { FormGroup, Validators } from '@angular/forms'; // Classes para formulários reativos e validação
import { NgForm, FormControl } from '@angular/forms'; // Classes para formulários direcionados e controles de formulário


@Component({
    selector: 'app-tab-view',
    standalone: true,
    imports: [
        CommonModule,
        TabViewModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        InputTextareaModule,
        ReactiveFormsModule

    ],
    templateUrl: './tab-view.component.html',
    styleUrl: './tab-view.component.less'
})

/**
 * Componente responsável por exibir e gerenciar as abas de conteúdo.
 * 
 */
export class TabViewComponent implements OnInit {

    activeIndex: number = 5;

    /**
     * Recursos relacionados a cada agrupamento de conteúdos, chamado de "Aula".
     * Cada aula possui um ID que identifica o agrupamento de conteúdos.
     * 
     * @resources Array que contém objetos representando cada agrupamento de recursos.
     *            Cada objeto possui um ID e um array chamado "content".
     *            O array "content" é composto por informações como nome, link, instituto,
     *            ordem e descrição do recurso.
     */
    public resources: any[] = [];

    /**
     * Forma de determinar o ID de cada agrupamento de conteúdos.
     * 
     * @contentId Próximo ID a ser atribuído a cada agrupamento de conteúdos.
     *            Inicializado como 1.
     */
    contentId = 1;

    /**
     * FormGroup que contém os formControls para o formulário de entrada.
     * 
     * @formControl FormGroup que contém os controles do formulário.
     *              Inicialmente indefinido e posteriormente inicializado
     *              com formControls para 'name', 'link', 'institute', 'sort'
     *              e 'description'.
     */
    formControl!: FormGroup;

    /**
     * 
     * @param formBuilder 
     */

    constructor(
        /**
         * Construtor da classe para inicialização do FormBuilder.
         * 
         * @formBuilder Objeto FormBuilder utilizado para construir formGroups e formControls.
         */
        private formBuilder: FormBuilder
    ) {
        // Verifica se existe um array armazenado em cache
        const classCache = localStorage.getItem('classCache');
        if (classCache) {
            this.resources = JSON.parse(classCache);
            // Determina o próximo ID baseado no último ID armazenado
            const lastId = this.resources[this.resources.length - 1].id;
            this.contentId = parseInt(lastId) + 1;
        }

    }


    ngOnInit(): void {
        // Inicialização do FormGroup usando o formBuilder para criar formControls
        this.formControl = this.formBuilder.group({
            name: new FormControl('', [Validators.required]),
            link: new FormControl('', [Validators.required]),
            institute: new FormControl('', [Validators.required]),
            sort: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required])
        });
    }

    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    addCourse(): void {
        this.resources.push()

        const novoObjeto = {
            id: this.contentId.toString().padStart(2, '0'), // Converte o ID para string e preenche com zero à esquerda se necessário
            content: [] // Conteúdo do objeto, se necessário
        };
        this.resources.push(novoObjeto);
        this.contentId++; // Incrementa o próximo ID para a próxima inserção
        // Salva o array no cache do navegador
        localStorage.setItem('classCache', JSON.stringify(this.resources));

        console.log(this.resources); // Saída: [{ id: "01", content: {} }, { id: "02", content: {} }, ...]

    }

    addFeature(name: string, link: string, institute: string, sort: number, description: string): void {
        const novoRecurso = {
            name: name,
            link: link,
            institute: institute,
            sort: sort,
            description: description
        };
        // Adiciona o novo recurso ao array
        this.resources.push(novoRecurso);

        // Limpa os campos do formulário ou realiza outras ações necessárias
        this.clearForm();

        console.log(this.resources)
    }

    clearForm() {
        // Limpa os valores dos campos do formulário
    }

    submitForm(): void {

        if (this.formControl && this.formControl.valid) {
            // Lógica para enviar o formulário
            console.log(this.formControl.value);
        } else {
            // Tratar caso o formulário seja inválido
        }
    }
}

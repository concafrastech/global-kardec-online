// Importações essenciais do Angular
import { Component, OnInit, NgModule, ChangeDetectorRef } from '@angular/core'; // Funcionalidades básicas para componentes
import { CommonModule } from '@angular/common'; // Funcionalidades básicas do Angular

// Importações do PrimeNG para componentes específicos
import { TabViewModule } from 'primeng/tabview';  // Componente TabView do PrimeNG
import { ButtonModule } from 'primeng/button';    // Componente Button do PrimeNG
import { DialogModule } from 'primeng/dialog';  // Componente Dialog do PrimeNG
import { InputTextModule } from 'primeng/inputtext'; // Componente InputText do PrimeNG
import { InputTextareaModule } from 'primeng/inputtextarea'; // Componente InputTextarea do PrimeNG
import { DropdownModule } from 'primeng/dropdown'; // Componente Dropdown do PrimeNG

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
        ReactiveFormsModule,
        DropdownModule,
        FormsModule

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
     * Construtor da classe para inicialização do FormBuilder e ChangeDetectorRef.
     * 
     * @param formBuilder Objeto FormBuilder utilizado para construir formGroups e formControls.
     * @param cdr Objeto ChangeDetectorRef para forçar detecção de alterações.
     */

    constructor(
        private formBuilder: FormBuilder,
        private cdr: ChangeDetectorRef
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

    /**
      * Array que contém as opções de tipo de arquivo.
      * Cada opção é um objeto com propriedades 'name' e 'code'.
      * 
      * @optionsType Array que contém as opções de tipo de arquivo.
      *               Cada opção é um objeto com as propriedades 'name' e 'code'.
      *               O tipo de arquivo é representado pelo nome e pelo código do ícone correspondente.
      */
    optionsType: any[] | undefined;

    /**
     * Método de ciclo de vida do Angular chamado após a inicialização do componente.
     * Inicializa o FormGroup utilizando o FormBuilder para criar formControls para os campos do formulário.
     * Também inicializa as opções de tipo de arquivo.
     */
    ngOnInit(): void {
        // Inicialização do FormGroup usando o formBuilder para criar formControls
        this.formControl = this.formBuilder.group({
            name: new FormControl('', [Validators.required]),
            typeFile: new FormControl('', [Validators.required]),
            link: new FormControl('', [Validators.required]),
            institute: new FormControl('', [Validators.required]),
            sort: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required])
        });

        // Inicialização das opções de arquivo
        this.optionsType = [
            { name: 'Arquivo', code: 'pi-file' },
            { name: 'Slide Aula', code: 'pi-id-card' },
            { name: 'Áudio', code: 'pi-volume-up' },
            { name: 'Vídeo', code: 'pi-play' }
        ];
        console.log(this.resources);
    }

    visible: boolean = false;
    indexContent: any = "";

    /**
     * Método responsável por exibir o diálogo de adicionar conteúdo.
     * 
     * @param index O índice do conteúdo para o qual o diálogo está sendo exibido.
     */
    showDialog(index: any): void {
        this.indexContent = index;
        this.visible = true;
    }

    /**
     * Método responsável por adicionar um novo curso ao array de recursos.
     * Cria um novo objeto com um ID único e um array de conteúdo vazio, e adiciona-o ao array de recursos.
     * Incrementa o próximo ID para a próxima inserção.
     * Salva o array no cache do navegador.
     * 
     * @remarks A saída do console exibe o array de recursos atualizado após a adição do novo curso.
     */
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

    /**
   * Método responsável por limpar os valores dos campos do formulário.
   */
    clearForm() {
        // Define os valores dos campos do formulário como vazio
        this.formControl.get('name')?.setValue('');
        this.formControl.get('typeFile')?.setValue('');
        this.formControl.get('link')?.setValue('');
        this.formControl.get('institute')?.setValue('');
        this.formControl.get('sort')?.setValue('');
        this.formControl.get('description')?.setValue('');
    }

    submitForm(): void {
        if (this.formControl && this.formControl.valid) {
            // Lógica para enviar o formulário
            if (this.indexContent !== "") {
                //  this.resources[this.indexContent].content.push(this.formControl.value);
                this.resources[this.indexContent].content.push(this.formControl.value);
                localStorage.setItem('classCache', JSON.stringify(this.resources));
                this.visible = false;
                this.clearForm()
            }
        } else {
            // Tratar caso o formulário seja inválido
        }
    }

    onCloseTab(tabId: string) {
        // Encontrar o índice do item no array resources com base no tabId
        const index = this.resources.findIndex(item => item.id === tabId);
        // Se o índice for encontrado, remover a entrada inteira do array resources
        if (index !== -1) {
            this.resources.splice(index, 1);
            this.cdr.detectChanges(); // Força uma nova detecção de alterações após a alteração no array
            localStorage.setItem('classCache', JSON.stringify(this.resources));
        }
    }
}
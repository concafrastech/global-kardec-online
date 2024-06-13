// Importações essenciais do Angular
import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core'; // Funcionalidades básicas para componentes
import {CommonModule} from '@angular/common'; // Funcionalidades básicas do Angular
// Importações do PrimeNG para componentes específicos
import {TabViewModule} from 'primeng/tabview'; // Componente TabView do PrimeNG
import {ButtonModule} from 'primeng/button'; // Componente Button do PrimeNG
import {DialogModule} from 'primeng/dialog'; // Componente Dialog do PrimeNG
import {InputTextModule} from 'primeng/inputtext'; // Componente InputText do PrimeNG
import {InputTextareaModule} from 'primeng/inputtextarea'; // Componente InputTextarea do PrimeNG
import {DropdownModule} from 'primeng/dropdown'; // Componente Dropdown do PrimeNG
// Importações relacionadas a formulários do Angular
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'; // Classes para formulários reativos e validação
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';

// Service
import {ResourceService} from "../../../services/resource/resource.service";
import {ItemContentService} from "../../../services/resource/itemContent/item-content.service";

// Models
import {ItemContent} from "../../../models/itemContent";
import {Content} from "../../../models/content";
import {CourseInfo} from "../../../models/content";

import {LogPipePipe} from "./log-pipe.pipe";

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
        FormsModule,
        ToastModule,
        LogPipePipe

    ],
    templateUrl: './tab-view.component.html',
    styleUrl: './tab-view.component.less',
    providers: [MessageService]

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
     * FormGroup que contém os formControls para o formulário de entrada.
     *
     * @formControl FormGroup que contém os controles do formulário.
     *
     */
    formControlContent!: FormGroup;

    /**
     * Construtor da classe para inicialização de dependências.
     *
     * @param formBuilder Objeto FormBuilder utilizado para construir formGroups e formControls.
     * @param cdr Objeto ChangeDetectorRef para forçar detecção de alterações.
     * @param contentService Serviço para gerenciar recursos de conteúdo.
     * @param itemContentService Serviço para gerenciar itens de conteúdo.
     * @param messageService Serviço para exibir mensagens no aplicativo.
     */
    constructor(
        private formBuilder: FormBuilder,
        private cdr: ChangeDetectorRef,
        private contentService: ResourceService,
        private itemContentService: ItemContentService,
        private messageService: MessageService
    ) {
        // Verifica se existe um array armazenado em cache
        // const classCache = localStorage.getItem('classCache');
        // if (classCache) {
        //     try {
        //         // Se houver um cache, parseia o JSON para obter os recursos
        //         this.resources = JSON.parse(classCache);
        //         // Determina o próximo ID com base no último ID armazenado
        //         const lastId = this.resources[this.resources.length - 1].id;
        //         this.contentId = parseInt(lastId) + 1;
        //     } catch (error) {
        //         // Se houver um erro ao analisar o cache, exibe uma mensagem de erro
        //         console.error('Erro ao analisar o cache de recursos:', error);
        //         // Limpa o cache para evitar problemas adicionais
        //         localStorage.removeItem('classCache');
        //     }
        // } else {
        //     // Se não houver cache, inicializa o array de recursos
        //     this.resources = [];
        // }

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
        this.formControlContent = this.formBuilder.group({
            contentName: ['', Validators.required],
            sortOrder: ['', Validators.required],
        });

        // Inicialização das opções de arquivo
        this.optionsType = [
            {name: 'PDF', id: 4, code: 'pi-file'},
            {name: 'Youtube', id: 2, code: 'pi-id-card'},
            {name: 'Áudio', id: 1, code: 'pi-volume-up'},
            {name: 'Vídeo', id: 3, code: 'pi-play'}
        ];
        if (this.idCourse !== null) this.getContentPerCourse()
        console.log(this.resources)
    }

    visible: boolean = false;
    visibleContent: boolean = false;
    indexContent: any = "";
    @Input() idCourse!: string | null;

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
     * Método responsável por exibir o diálogo de adicionar conteúdo.
     *
     */
    showDialogContent(): void {
        this.visibleContent = true;
    }

    /**
     * Método responsável por adicionar um novo curso ao array de recursos.
     * Cria um novo objeto com um ID único e um array de conteúdo vazio, e adiciona-o ao array de recursos.
     * Incrementa o próximo ID para a próxima inserção.
     * Salva o array no cache do navegador.
     *
     * @remarks A saída do console exibe o array de recursos atualizado após a adição do novo curso.
     */
    addCourseContent(): void {
        let courseInfo: CourseInfo | any = this.getCourseInfo();

        if (this.formControlContent && this.formControlContent.valid) {

            if (!courseInfo) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Algo de errado não está certo'
                });
                return;
            }

            const content: Content = {
                nome:  this.formControlContent.get('contentName')?.value,
                nomeCurso: courseInfo.nome,
                ordem: this.formControlContent.get('sortOrder')?.value,
                curso: courseInfo.id
            }

            this.resources.push()

            this.contentService.postResource(content).subscribe({
                next: (response) => {
                    const novoObjeto = {
                        id: this.contentId.toString().padStart(2, '0'), // Converte o ID para string e preenche com zero à esquerda se necessário
                        nome: response.nome,
                        idContent: response.uuid,
                        content: [] // Conteúdo do objeto, se necessário
                    };
                    this.resources.push(novoObjeto);

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: `A Aula foi criada com sucesso`
                    });
                },
                error: (error) => {
                    console.error(error)
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Algo de errado não está certo'
                    });
                }
            });
            this.contentId++; // Incrementa o próximo ID para a próxima inserção
            this.resetFormControls()
            this.visibleContent = false;


        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Ops!',
                detail: 'Todos os campos devem ser preenchidos'
            });
        }
    }


    /**
     * Método responsável por limpar os valores dos campos do formulário.
     */
    clearForm() {
        // Define os valores dos campos do formulário como vazio
        this.formControl.reset();

    }
    /**
     * Método responsável por limpar os valores dos campos do formulário.
     */
    resetFormControls(): void {
        if (this.formControlContent) {
            this.formControlContent.reset();

        }
    }

    /**
     * Cria um novo item de conteúdo com base nos dados do formulário.
     *
     * Verifica se o formulário é válido antes de criar o novo item de conteúdo.
     *
     * @returns void
     */
    createItemContent(): void {
        if (this.formControl && this.formControl.valid) {
            // Lógica para enviar o formulário
            if (this.indexContent !== "") {
                const itemContend: ItemContent = {
                    nome: this.formControl.value.name,
                    descricao: this.formControl.value.description,
                    linkRecurso: this.formControl.value.link,
                    idTipoRecursoAula: this.formControl.value.typeFile.id, // implementar ainda
                    nomeTipoRecursoAula: this.formControl.value.typeFile.name, // nao faço ideia do que seja isso
                    conteudo: this.resources[this.indexContent].idContent, // Id do conteúdo
                    nomeConteudo: this.formControl.value.typeFile.name, // nome do conteúdo, precisa implementar
                    ordem: 1 // tem que implementar
                }

                this.itemContentService.setItemContentFromCentro(itemContend).subscribe({
                    next: (response) => {
                        this.resources[this.indexContent].content.push(response);
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: `Recurso ${response.nome} foi criado com sucesso`
                        });
                    },
                    error: (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Algo de errado não está certo'
                        });
                        console.error(error)
                    }
                })

                //localStorage.setItem('classCache', JSON.stringify(this.resources));
                this.visible = false;
                this.clearForm()
            }
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Algo de errado não está certo'
            });
        }
    }

    createContent(): void{

    }

    /**
     * Fecha a aba com o ID especificado.
     *
     * @param tabId O ID da aba a ser fechada.
     */
    onCloseTab(tab: any) {
        // Encontrar o índice do item no array resources com base no tabId
        const index = this.resources.findIndex(item => item.id === tab.id);
        // Se o índice for encontrado, remover a entrada inteira do array resources

        if (index !== -1) {
            this.contentService.deleteResource(tab.idContent).subscribe({
                next: (response) => {
                    this.resources.splice(index, 1);
                    this.cdr.detectChanges(); // Força uma nova detecção de alterações após a alteração no array

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Sucesso',
                        detail: 'Item de conteúdo foi deletado com sucesso'
                    });
                },
                error:(error)=> {

                    // Exibir uma mensagem de erro se o item não for encontrado
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erro',
                        detail: 'Você precisa deletar os conteúdos da aula'
                    });
                    console.error(error)
                }
            })


        }
    }

    /**
     * Obtém as informações do curso armazenadas no localStorage.
     *
     * @return {boolean | any[]} Retorna as informações do curso como um array de objetos,
     * ou `false` se não houver informações armazenadas ou ocorrer um erro.
     */
    getCourseInfo(): any[] {
        let courseInfo: any[] = [];
        try {
            // Recupera o item 'courseInfo' do localStorage
            const courseInfoStr: string | null = localStorage.getItem('courseInfo');

            if (courseInfoStr) {
                // Converte a string JSON de volta para um objeto JavaScript
                courseInfo = JSON.parse(courseInfoStr);
            } else {
                // Define courseInfo como false se não houver dados armazenados
                courseInfo = [];
                // Adiciona uma mensagem de erro usando o messageService
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Não foi possível carregar o curso, entre em contato com o administrador'
                });
            }
        } catch (error) {
            // Em caso de erro ao recuperar ou parsear os dados, define courseInfo como false
            courseInfo = [];
            // Adiciona uma mensagem de erro usando o messageService
            this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Algo de errado não está certo'
            });
            // Loga o erro no console para debug
            console.error('Erro ao obter as informações do curso:', error);
        }

        return courseInfo;
    }

    getContentPerCourse(): void {
        if (this.idCourse !== null)
            this.contentService.getContentPerCourse(this.idCourse).subscribe({
                next: (response) => {
                    response.forEach((content: any) => {
                        const itemContent = {
                            description: "",
                            institute: "",
                            link: "",
                            name: "",
                            sort: "",
                            typeFile: {name: '', id: "", code: ''}
                        }
                        let newContent = {
                            id: "", // Converte o ID para string e preenche com zero à esquerda se necessário
                            nome:"nome",
                            idContent: 0,
                            content: [] // Conteúdo do objeto, se necessário
                        };
                        this.itemContentService.getItemPerIdContent(content.uuid).subscribe({
                            next: (response) => {
                                if (response.length > 0) newContent.content = response;
                            }
                        })
                        newContent = {
                            id: this.contentId.toString().padStart(2, '0'), // Converte o ID para string e preenche com zero à esquerda se necessário
                            nome:content.nome,
                            idContent: content.uuid,
                            content: [] // Conteúdo do objeto, se necessário
                        };

                        this.resources.push(newContent);
                    });
                }
            })
    }

    deleteItemContent(itemId: string, tabId: string, index: number): void {
        this.itemContentService.deleteItemContent(itemId).subscribe({
            next: (response) => {
                // Encontrar a aba que contém o item de conteúdo
               let tab = this.resources.find(resource => resource.idContent === tabId );
                if (tab && tab.content && tab.content[index]?.uuid === itemId) {

                    // Remover o item de conteúdo do array local
                    tab.content.splice(index, 1);

                    // Atualizar this.resources
                    this.resources = [...this.resources];

                    // Forçar uma nova detecção de alterações
                    this.cdr.detectChanges();

                    // Exibir uma mensagem de sucesso
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Sucesso',
                        detail: 'Item de conteúdo foi deletado com sucesso'
                    });
                } else {
                    // Exibir uma mensagem de erro se o item não for encontrado
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erro',
                        detail: 'Item de conteúdo não encontrado'
                    });
                }
            },
            error: (error) => {
                console.error(error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Algo de errado não está certo'
                });
            }
        });
    }

    /**
     * Retorna o código do ícone correspondente ao id fornecido.
     *
     * @param id O id do tipo de recurso.
     * @return O código do ícone ou undefined se não encontrado.
     */
    returnIcon(id: string): string | undefined {
        const option = this.optionsType?.find(option => option.id === id);
        return option ? option.code : undefined;
    }

}

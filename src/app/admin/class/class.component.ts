import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

// Services
import { SpiritCenterService } from '../../services/spirit-center/spirit-center.service';
import { ClassService } from '../../services/class/class.service';
import { SpiritCenter } from '../../models/spiritCenter';

// PrimeNg
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';



// Models
interface ClassContent {
    uuid?: string;
    nomeCentro: string;
    anoCalendario?: number;
    linkSala?: string;
    nomeCurso?: string;
    semestreCalendario?: string;
}

interface ClassResponse {
    content: ClassContent[]; // Ajuste o tipo conforme necessário
}


@Component({
    selector: 'app-class',
    standalone: true,
    imports: [
        CardModule,
        AccordionModule,
        NgForOf,
        TableModule,
        RouterLink,
        ButtonModule,
        ToastModule
    ],
    templateUrl: './class.component.html',
    styleUrls: ['./class.component.less'],
    providers: [MessageService]
})
export class ClassComponent implements OnInit {
    /**
     * Propriedade que armazena a lista de turmas.
     *
     * Esta propriedade é um array de objetos que pode ter duas estruturas possíveis:
     * 1. Um objeto que contém:
     *    - Uma lista de classes, onde cada classe possui:
     *      - `linkSala`: Um link para a sala (string ou indefinido).
     *      - `nomeCurso`: O nome do curso (string ou indefinido).
     *      - `anoCalendario`: O ano do calendário (número ou indefinido).
     *    - `nomeCentro`: O nome do centro espírita (string).
     * 2. Um objeto que contém:
     *    - Uma lista de classes com estrutura genérica (`any[]`).
     *    - `nomeCentro`: O nome do centro espírita (string).
     */
    public classList: (
        | {
              classes: {
                  linkSala: string | undefined;
                  nomeCurso: string | undefined;
                  anoCalendario: number | undefined;
              }[];
              nomeCentro: string;
          }
        | { classes: any[]; nomeCentro: string }
    )[] = [];

    /**
     *
     * @param _spiritCenter
     * @param _classService
     * @param messageService
     */
    constructor(
        private _spiritCenter: SpiritCenterService,
        private _classService: ClassService,
        private messageService: MessageService
    ) {}

    /**
     * Método do ciclo de vida do Angular que é chamado após a inicialização do componente.
     *
     * Este método é utilizado para realizar inicializações adicionais que são necessárias
     * para o componente após a sua criação. Neste caso, ele chama o método `getAllClasses`
     * para carregar todas as turmas quando o componente é inicializado.
     */
    ngOnInit(): void {
        this.getAllClasses();
    }

    /**
     * Busca todas as classes para cada centro espírita e as armazena na propriedade `classList`.
     *
     * Este método executa os seguintes passos:
     * 1. Busca todos os centros espirituais usando o método `getAllSpiritsCenter` do serviço `SpiritCenterService`.
     * 2. Para cada centro espiritual encontrado, faz uma chamada ao `ClassService` para buscar as classes associadas ao UUID do centro espiritual.
     * 3. Agrega as respostas das chamadas ao `ClassService` e formata os resultados.
     * 4. Popula a propriedade `classList` com os dados formatados.
     * 5. Registra no console o conteúdo final de `classList`.
     *
     * O método também inclui tratamento de erros para garantir que qualquer falha ao buscar dados seja tratada de forma apropriada.
     * Se ocorrer um erro ao buscar os centros espirituais, ele será registrado no console e a execução continuará.
     * Se ocorrer um erro ao buscar as classes para um centro espiritual específico, esse erro também será registrado no console,
     * e a execução continuará para os outros centros.
     *
     * @return {void}
     */
    getAllClasses(): void {
        this._spiritCenter
            .getAllSpiritsCenter()
            .pipe(
                catchError((error) => {
                    console.error('Error fetching spirit centers:', error);
                    return [];
                }),
            )
            .subscribe((scs: SpiritCenter[]) => {
                const classRequests = scs.map((sc) =>
                    this._classService.getBySpiritCenter(sc.uuid).pipe(
                        catchError((error) => {
                            console.error(
                                `Error fetching classes for spirit center ${sc.uuid}:`,
                                error,
                            );
                            return [];
                        }),
                    ),
                );
                forkJoin(classRequests).subscribe(
                    (responses: ClassResponse[]) => {
                        this.classList = responses
                            .map((response) => {
                                if (response.content.length > 0) {
                                    return {
                                        nomeCentro:
                                            response.content[0].nomeCentro,
                                        classes: response.content.map(
                                            (classContent) => ({
                                                anoCalendario:
                                                    classContent.anoCalendario,
                                                linkSala: classContent.linkSala,
                                                nomeCurso:
                                                    classContent.nomeCurso,
                                                uuid: classContent.uuid,
                                                semestreCalendario:
                                                    classContent.semestreCalendario,
                                            }),
                                        ),
                                    };
                                } else {
                                    return { nomeCentro: '', classes: [] };
                                }
                            })
                            .filter((item) => item.nomeCentro); // Remove any empty items
                    },
                );
            });
    }

    /**
     * Método que deleta a turma.
     * Este método faz uma solicitação para excluir uma turma específica identificada pelo seu UUID.
     * Após a exclusão bem-sucedida, ele recarrega a lista de turmas e exibe uma mensagem de sucesso.
     * Se ocorrer um erro durante a exclusão, ele exibe uma mensagem de erro.
     *
     * @param uuid - O UUID da turma que será excluída.
     */
    deleteClass(uuid: string): void {
        this._classService.delete(uuid).subscribe({
            // Callback para quando a exclusão for bem-sucedida
            next: (): void => {
                // Recarrega a lista de turmas
                this.getAllClasses();
                // Adiciona uma mensagem de sucesso ao MessageService
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Turma excluída com sucesso'
                });
            },
            // Callback para quando ocorrer um erro na exclusão
            error: (error): void => {
                // Exibe o erro no console
                console.error(error);
                // Adiciona uma mensagem de erro ao MessageService
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Algo de errado não está certo'
                });
            },
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { SpiritCenterService } from '../../services/spirit-center/spirit-center.service';
import { ClassService } from '../../services/class/class.service';
import { SpiritCenter } from '../../models/spiritCenter';
import { forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { Class } from '../../models/class';
import { NgForOf } from '@angular/common';
import {RouterLink} from '@angular/router';

interface ClassContent {
    nomeCentro: string;
    anoCalendario?: number;
    linkSala?: string;
    nomeCurso?: string;
    uuid?: string,
    semestreCalendario?: string,
}

interface ClassResponse {
    content: ClassContent[]; // Ajuste o tipo conforme necessário
}

interface ClassList {
    nomeCentro: string;
    classes: ClassContent[];
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
    ],
    templateUrl: './class.component.html',
    styleUrls: ['./class.component.less'],
})
export class ClassComponent implements OnInit {
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

    constructor(
        private _spiritCenter: SpiritCenterService,
        private _classService: ClassService,
    ) {}

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
}

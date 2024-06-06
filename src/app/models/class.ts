/**
 *
 * Todos os direitos pertencem à Concafras.
 *
 * Portal da Concafras: https://portal.concafras.com/
 */
export interface Class {
    uuid?: string;
    nome: string;
    ordem: any; // Este tipo pode ser ajustado conforme necessário
    linkSala: string;
    curso: string;
    nomeCurso: string;
    calendario: string;
    anoCalendario: number;
    semestreCalendario: number;
    uuidCentro: string;
    nomeCentro: string;
}

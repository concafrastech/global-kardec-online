/**
 *
 * Todos os direitos pertencem à Concafras.
 *
 * Portal da Concafras: https://portal.concafras.com/
 */
export interface Course {
    uuid?: string;
    nome: string;
    capaCurso?: string;
    descricao?: string;
    instituto: string;
    idioma: string;
    tipoCurso?: number;
    modalidadeEnsino?: string;
}

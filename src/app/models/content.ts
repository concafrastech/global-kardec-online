/**
 * Interface representando o conteúdo de um curso.
 *
 * Todos os direitos pertencem à Concafras.
 *
 * Esta interface define a estrutura do conteúdo de um curso,
 * incluindo o nome do conteúdo, a ordem de classificação, o ID do curso
 * e o nome do curso ao qual o conteúdo pertence.
 *
 * Portal da Concafras: https://portal.concafras.com/
 */
export interface Content {
    nome:string,
    ordem: any,
    curso: any,
    nomeCurso: any
}

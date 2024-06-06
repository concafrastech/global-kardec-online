/**
 *
 * Todos os direitos pertencem à Concafras.
 *
 * Portal da Concafras: https://portal.concafras.com/
 */
export class User {
    toJSON: any;
    constructor(
        public uid: string,
        public name: string,
        public email: string,
        public password: string,
      ) {}
}
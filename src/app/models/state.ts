/**
 *
 * Todos os direitos pertencem à Concafras.
 *
 * Portal da Concafras: https://portal.concafras.com/
 */

import { Country } from './country';

export interface State {
    id?: number;
    nome: string;
    pais: Country;
}

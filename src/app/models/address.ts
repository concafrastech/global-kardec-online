/**
 *
 * Todos os direitos pertencem à Concafras.
 *
 * Portal da Concafras: https://portal.concafras.com/
 */

import { City } from './city';

export interface Address {
    logradouro: string;
    numero: string;
    bairro: string;
    codigoPostal: string;
    cidade: City;
}

/**
 *
 * Todos os direitos pertencem à Concafras.
 *
 * Portal da Concafras: https://portal.concafras.com/
 */

import { Contact } from './contact';
import { Address } from './address';
import { User } from './user';

export interface People {
    uuid?: string;
    uuidCentro?: string;
    nome: string;
    dataNascimento: string;
    contato: Contact;
    endereco: Address;
    idioma?: string;
    nomeIdioma: string;
    usuario: User;
}

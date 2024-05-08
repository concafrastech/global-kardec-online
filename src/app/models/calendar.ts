import { DiaAula } from './diaAula';

export interface Calendar {
    uuid?: string;
    uuidCentro: string;
    semestre: number;
    ano: number;
    diasAula: DiaAula[];
}

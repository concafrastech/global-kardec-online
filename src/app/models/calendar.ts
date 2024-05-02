import { DiaAula } from './diaAula';

export interface Calendar {
    uuid?: string;
    uuidCentro: string;
    semestre: Int32Array;
    ano: Int32Array;
    diasAula: DiaAula[];
}

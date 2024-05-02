export interface DiaAula {
    uuid?: string;
    dataAula: string;
    idTipoDiaCalendario: BigInt64Array;
    nomeTipoDiaCalendario?: string;
    aulaEspecial: boolean;
}

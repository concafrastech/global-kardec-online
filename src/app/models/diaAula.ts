export interface DiaAula {
    uuid?: string;
    dataAula: Date;
    idTipoDiaCalendario: number;
    nomeTipoDiaCalendario?: string;
    aulaEspecial: boolean;
}

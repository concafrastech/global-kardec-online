import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { Calendar } from '../../../models/calendar';
import { SpiritCenter } from '../../../models/spiritCenter';
import { SpiritCenterService } from '../../../services/spirit-center/spirit-center.service';
import { DropdownDefault } from '../../../models/utils/dropdownDefault';

@Component({
    selector: 'app-calendar-new',
    standalone: true,
    imports: [
        ButtonModule,
        RippleModule,
        RouterLink,
        InputTextModule,
        FormsModule,
        DropdownModule,
        InputNumberModule,
    ],
    templateUrl: './calendar-new.component.html',
    styleUrl: './calendar-new.component.less',
})
export class CalendarNewComponent implements OnInit {
    calendar: Calendar;
    spiritCenter: SpiritCenter;
    selectedSpiritCenter: DropdownDefault | undefined;
    spiritCenters: DropdownDefault[] | undefined;

    constructor(private _spiritCenterService: SpiritCenterService) {
        // Variável que representa o calendário
        this.calendar = {
            uuidCentro: '',
            semestre: 0,
            ano: 0,
            diasAula: [],
        };

        // Variável que representa o Centro Espírita
        this.spiritCenter = {
            uuid: '',
            nome: '',
            cidade: '',
            estado: '',
        };

        this.spiritCenters = [];
    }

    ngOnInit(): void {
        this.getAllSpiritCenters();
    }

    /**
     * Função destinada a retornar todos os Centros Espíritas registrados
     *
     * @return void
     */
    getAllSpiritCenters(): void {
        this._spiritCenterService
            .getAllSpiritsCenter()
            .subscribe((spiritCenters: SpiritCenter[]): void => {
                let spiritCentersTemp: DropdownDefault[] = [];
                spiritCenters.forEach((spiritCenter: SpiritCenter): void => {
                    let spiritCenterSplit = spiritCenter.nome.split(' ');
                    let code = '';
                    spiritCenterSplit.forEach((part: any) => {
                        if (code.length <= 3) {
                            code += part.charAt(0).toUpperCase();
                        }
                    });
                    spiritCentersTemp.push(<DropdownDefault>{
                        uuid: spiritCenter.uuid,
                        name: spiritCenter.nome,
                        code: code,
                    });
                });
                this.spiritCenters = spiritCentersTemp;
            });
    }

    onSubmit(): void {
        if (this.selectedSpiritCenter?.uuid == undefined) {
            console.log('Falhou');
            return;
        }

        if (this.calendar.ano.toString().length < 4) {
            console.log('Ano incorreto.');
            return;
        }

        if (this.calendar.semestre < 1 || this.calendar.semestre > 2) {
            console.log('Semestre incorreto.');
            return;
        }

        this.calendar.uuidCentro = <string>this.selectedSpiritCenter?.uuid;
        console.log(this.calendar);
    }
}

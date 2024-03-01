import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { User } from '../../../models/user';

@Injectable({
    providedIn: 'root',
})
export class UserEventService {
    /**
     * Subject utilizado para gerenciar a emissão e assinatura de eventos relacionados a alterações nos dados do usuário.
     * Um Subject é um tipo de Observable que permite a emissão de eventos e a notificação de todos os assinantes registrados.
     * Este Subject é utilizado pelo serviço `UserEventService` para coordenar a comunicação entre componentes ou serviços
     * quando há alterações nos dados do usuário.
     */
    private userSubject = new Subject<any>();

    /**
     * Método utilizado para emitir eventos quando houver alterações nos dados do usuário.
     * Isso notificará todos os assinantes registrados sobre as alterações nos dados do usuário.
     *
     * @param userData - Os novos dados do usuário a serem emitidos como evento.
     */
    emitUserChangeEvent(userData: User): void {
        this.userSubject.next(userData);
    }

    /**
     * Método utilizado para assinar eventos de alteração nos dados do usuário.
     * Retorna um Observable que permite aos assinantes receber notificações sobre as alterações nos dados do usuário.
     *
     * @returns Um Observable que fornece notificações sobre as alterações nos dados do usuário.
     */
    onUserChange(): Observable<any> {
        return this.userSubject.asObservable();
    }
}

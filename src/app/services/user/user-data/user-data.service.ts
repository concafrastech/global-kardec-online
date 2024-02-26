import { Injectable } from '@angular/core';
import { User } from '../../../models/user';
import { UserEventService } from '../user-event/user-event.service';

@Injectable({
    providedIn: 'root'
})
export class UserDataService {

    /**
     * Chave utilizada para armazenar os dados do usuário no cache local.
     * Essa chave é utilizada como identificador único para os dados do usuário armazenados no localStorage.
     * Ao acessar ou modificar os dados do usuário no cache, esta chave é utilizada como referência.
     */
    private userCacheKey = 'userData';

    constructor(private userEventService: UserEventService) { }

    /**
     * Salva os dados do usuário no cache local.
     * 
     * @param user - Um objeto contendo os dados do usuário a serem armazenados.
     */
    set(user: User): void {
        // Salva os dados do usuário no cache
        localStorage.setItem(this.userCacheKey, JSON.stringify(user));

        // Notifica assinantes sobre a alteração nos dados do usuário
        this.userEventService.emitUserChangeEvent(user);

    }

    /**
     * Retorna os dados do usuário armazenados no cache local.
     * 
     * @returns Um objeto contendo os dados do usuário ou null se não houver dados no cache.
     */
    get(): any | null {
        // Retorna os dados do usuário do cache
        const userData = localStorage.getItem(this.userCacheKey);
        return userData ? JSON.parse(userData) : null;
    }

    /**
     * Atualiza os dados do usuário no cache local.
     * 
     * @param updatedData - Um objeto contendo os novos dados a serem mesclados com os dados existentes do usuário.
     */
    update(updatedData: User): void {
        // Obtém os dados do usuário do cache
        const userData = this.get();

        if (userData) {
            // Atualiza os dados do usuário com os novos dados
            const updatedUser = { ...userData, ...updatedData };

            // Salva os dados atualizados no cache
            localStorage.setItem(this.userCacheKey, JSON.stringify(updatedUser));

            this.userEventService.emitUserChangeEvent(userData);

        }
    }
}

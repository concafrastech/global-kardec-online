import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    public identity: any;


    constructor() { }


    getIdentity() {
        let identity = JSON.parse(localStorage.getItem('userData') as string);

        if (identity != 'undefined' || null) {
            this.identity = identity;
        } else {
            this.identity = null;
        }

        return this.identity;
    }

    lsLogged() {
        let identity = JSON.parse(localStorage.getItem('userData') as string);
        
        if (identity === undefined) {
            return false;
        } else if (identity === null) {
            return false;
        } else {
            return true;
        }

    }
}

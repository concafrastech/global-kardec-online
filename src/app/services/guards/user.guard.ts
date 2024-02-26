import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable()
export class UserGuard implements CanActivate {
    constructor(private _router: Router, private _userService: UserService) { 
        let identity = this._userService.getIdentity()
    }

    canActivate() {
        let identity = this._userService.getIdentity();

        if (identity != null) {
            return true;
        } else {
            this._router.navigate(['/login']);
            return false;
        }
    }

}
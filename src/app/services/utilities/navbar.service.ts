import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
    private navbarMinimize = new BehaviorSubject<boolean>(false);
    minimize = this.navbarMinimize.asObservable();

    getMinimize(): boolean {
        return this.navbarMinimize.value;
      }
    
      setMinimize(value: boolean): void {
        this.navbarMinimize.next(value);
      }
}

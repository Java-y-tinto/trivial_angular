import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GestordeturnosService {
private puedeTirarSubject = new BehaviorSubject<boolean>(true);
puedetirar$ = this.puedeTirarSubject.asObservable();
  constructor() { }

  permitirTirada(): void {
    this.puedeTirarSubject.next(true);
  }

  restringirTirada(): void {
    this.puedeTirarSubject.next(false)
  }

}

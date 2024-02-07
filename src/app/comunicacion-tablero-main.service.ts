import { EventEmitter, Injectable } from '@angular/core';
import { TableroComponent } from './tablero/tablero.component';
import { Observable } from 'rxjs';
import { Casilla } from './casilla';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionTableroMainService {
  evento!: EventEmitter<Casilla[]>
  constructor() { }
  recibirEvento(evento: EventEmitter<Casilla[]>){
    this.evento = evento
  }
}

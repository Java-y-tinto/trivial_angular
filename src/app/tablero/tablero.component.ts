// tablero.component.ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css'],
  standalone: true
})
export class TableroComponent {
  resultado: string = "Tira los dados!";
  puedeTirar: boolean = true;

  @Output() tiradaDado = new EventEmitter<number>();

  tirarDado(): void {
    if (this.puedeTirar) {
      var tirada = Math.floor(Math.random() * (6 - 1)) + 1;
      this.resultado = "Resultado: " + tirada;
      this.tiradaDado.emit(tirada); // Emitir el resultado del dado
    }
  }
}

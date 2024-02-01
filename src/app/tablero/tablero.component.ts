// tablero.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Casilla } from '../casilla';
import { trigger, state, style, animate, transition } from '@angular/animations'
@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css'],
  standalone: true,
  animations: [
    trigger('moverFicha', [
      state('origen', style({
        transform: 'translateX(0)'
      })),
      state('destino', style({
        transform: 'translateX(100%)'
      })),
      transition('origen => destino', [
        animate('1s')
      ])
    ])
  ]
})
export class TableroComponent implements OnInit {
  resultado: string = "Tira los dados!";
  puedeTirar: boolean = true;
  estadoFicha: string = "A1"
  ngOnInit(): void {
    var categorias = ["arte-y-literatura", "geografia", "entretenimiento", "historia", "ciencias-y-naturaleza", "deportes-y-pasatiempos"];

    // Recorrer cada td y asignar una clase aleatoria de categorías
    var tds = document.querySelectorAll('td');
    tds.forEach(function(td) {
      var randomIndex = Math.floor(Math.random() * categorias.length);
      td.className = categorias[randomIndex];
    });
  
  }
  @Output() tiradaDado = new EventEmitter<Casilla>();

  tirarDado(): void {
    if (this.puedeTirar) {
      var tirada = Math.floor(Math.random() * (6 - 1)) + 1;
      this.resultado = "Resultado: " + tirada;
      var td = document.getElementById(this.estadoFicha);
      var rect = td.getBoundingClientRect();
      var div = document.getElementById("ficha");
      div.style.transform = "translate(" + rect.left + "px, " + rect.top + "px)";
      //this.tiradaDado.emit();
    }
  }
}

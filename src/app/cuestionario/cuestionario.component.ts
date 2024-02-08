import { Component, EventEmitter, Input, AfterViewInit, Output, OnInit } from '@angular/core';
import { Respuesta } from '../respuesta';
import { ComponentPortal } from '@angular/cdk/portal'
import { Overlay,GlobalPositionStrategy,OverlayConfig,OverlayPositionBuilder } from '@angular/cdk/overlay'
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-cuestionario',
  standalone: true,
  imports: [],
  templateUrl: './cuestionario.component.html',
  styleUrl: './cuestionario.component.css'
})
export class CuestionarioComponent implements OnInit {
  
  @Input() enunciado!: string;
  @Input() respuestas!: Respuesta[];
  @Output() eventoCorreccion = new EventEmitter<boolean>();
  constructor(private overlay: Overlay) {}
  respuestaCorrecta: string = "";
  primeraRespuesta: boolean = true;
  ngOnInit(): void {
      this.mezclar()
  }

  mezclar(){
    for (let i = this.respuestas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.respuestas[i], this.respuestas[j]] = [this.respuestas[j], this.respuestas[i]];
    }
  }
  normalizar(cadena: string) :string {
    if (cadena.includes(' ')){
    cadena = cadena.trim()
    var cadenaSeparada = cadena.split(' ')
    var ultimoPedazo = cadenaSeparada[cadenaSeparada.length - 1 ]
    return ultimoPedazo
    } else{
      return cadena
    }

  }
  corregir() {
    var idCorrecta;
    
    for (let index of this.respuestas) {
      var esCorrecta = index.esCorrecta;
  
      if (esCorrecta == true) {
        idCorrecta = this.normalizar(index.respuesta);
        break;
      }
    }
  
    var prueba = document.querySelector(`input[id='${idCorrecta}']:checked`);
  
    if (prueba != null) {
      // La respuesta es correcta, emitir evento solo si no es la primera vez
      if (!this.primeraRespuesta) {
        this.eventoCorreccion.emit(true);
      }
    } else {
      // La respuesta es incorrecta, emitir evento solo si no es la primera vez
      if (!this.primeraRespuesta) {
        this.eventoCorreccion.emit(false);
      }
    }
  
    // Después de la primera respuesta, establecer la bandera en false
    this.primeraRespuesta = false;
  }
  
 
}

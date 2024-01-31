import { Component, EventEmitter, Input, AfterViewInit, Output } from '@angular/core';
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
export class CuestionarioComponent  {
  
  @Input() enunciado!: string;
  @Input() respuestas!: Respuesta[];
  @Output() eventoCorreccion = new EventEmitter<boolean>();
  constructor(private overlay: Overlay) {}
  respuestaCorrecta: string = "";
 corregir(){
  var idCorrecta;
  for (let index of this.respuestas){
    var esCorrecta = index.esCorrecta;
    if (esCorrecta == true){
      idCorrecta = index.respuesta;
      break;
    }
    }
    var prueba = document.querySelector(`input[id=${idCorrecta}]:checked`)
    if (prueba != null){
      //La respuesta es correcta
      this.eventoCorreccion.emit(true)
    } else {
      //La respuesta es incorrecta
      this.eventoCorreccion.emit(false)
    }
 }
 
}

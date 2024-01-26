import { Component, EventEmitter, Input, AfterViewInit, Output } from '@angular/core';
import { Respuesta } from '../respuesta';
@Component({
  selector: 'app-cuestionario',
  standalone: true,
  imports: [],
  templateUrl: './cuestionario.component.html',
  styleUrl: './cuestionario.component.css'
})
export class CuestionarioComponent implements AfterViewInit {
  
  @Input() enunciado!: string;
  @Input() respuestas!: Respuesta[];
  @Output() eventoCorreccion = new EventEmitter<boolean>();
  ngAfterViewInit(){
    setTimeout(() => {
      console.log(this.enunciado)
      console.log(this.respuestas)
    }, 3);
  }
  /*
  corregir(respuesta: string): void{
    //pendiente de implementar
    this.respuestaCorrecta.emit(true);
  }
  */
}

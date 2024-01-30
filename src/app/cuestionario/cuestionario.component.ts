import { Component, EventEmitter, Input, AfterViewInit, Output } from '@angular/core';
import { Respuesta } from '../respuesta';
import { ComponentPortal } from '@angular/cdk/portal'
import { Overlay,GlobalPositionStrategy,OverlayConfig,OverlayPositionBuilder } from '@angular/cdk/overlay'


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
  
  constructor(private overlay: Overlay) {}

  ngAfterViewInit(){
    
    setTimeout(() => {
      
    }, 3);
  }
  /*
  corregir(respuesta: string): void{
    //pendiente de implementar
    this.respuestaCorrecta.emit(true);
  }
  */
}

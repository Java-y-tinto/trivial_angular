// app.component.ts
import { Component, OnInit,ViewChild, ViewContainerRef, AfterViewInit,ChangeDetectorRef } from '@angular/core';
import { DadoService } from './dado.service'; // Asegúrate de tener el camino correcto hacia el servicio
import { FichaComponent } from './ficha/ficha.component'; // Asegúrate de tener el camino correcto hacia el componente de ficha
import { TableroComponent } from './tablero/tablero.component'; // Asegúrate de tener el camino correcto hacia el componente de tablero
import { DatabaseService } from './database.service';
import { CrearComponenteService } from './crear-componente.service';
import { Respuesta } from './respuesta';



@Component({
  standalone: true,
  selector: 'app-root',
  template: `<app-tablero (tiradaDado)="moverFicha($event)">
  <app-ficha [posX]="fichaPosX" [posY]="fichaPosY"></app-ficha>
</app-tablero>
<ng-container #cuestionarioContainer></ng-container>
` ,
  imports: [FichaComponent,TableroComponent]
})


export class AppComponent implements OnInit  {
  fichaPosX: number = 0;
  fichaPosY: number = 0;
  consulta: string = "";
  respuestas: Respuesta[] = [];
  arrayAEnviar: string[] = [];

  @ViewChild('cuestionarioContainer',{ static: true,read:ViewContainerRef }) cuestionarioContainer!: ViewContainerRef;
  constructor(private dadoService: DadoService,private DB: DatabaseService,private cuestionario: CrearComponenteService,private cambios: ChangeDetectorRef) {}
  ngOnInit(): void{
    console.log("He sido llamado en la funcion OnInit")
  this.DB.getPreguntaporCategoria("geografia").subscribe((val) =>{
    this.consulta = val[0].pregunta;
    this.respuestas = [
     {respuesta: val[0].respuestaCorrecta, esCorrecta: true},
      {respuesta: val[0].respuestaIncorrecta1, esCorrecta: false},
      {respuesta: val[0].respuestaIncorrecta2, esCorrecta:false},
      {respuesta: val[0].respuestaIncorrecta3, esCorrecta:false}
    ];
   console.log(this.respuestas)
    this.cuestionario.insertarCuestionario(this.cuestionarioContainer,this.consulta,this.respuestas)
  });
  }
  moverFicha(resultadoDado: number): void {
    console.log('Resultado del dado:', resultadoDado);
    this.fichaPosX += resultadoDado * 50;
  }
  
  
}

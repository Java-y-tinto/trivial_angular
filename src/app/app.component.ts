// app.component.ts
import { Component, OnInit,ViewChild, ViewContainerRef, AfterViewInit,ChangeDetectorRef } from '@angular/core';
import { DadoService } from './dado.service'; // Asegúrate de tener el camino correcto hacia el servicio
import { FichaComponent } from './ficha/ficha.component'; // Asegúrate de tener el camino correcto hacia el componente de ficha
import { TableroComponent } from './tablero/tablero.component'; // Asegúrate de tener el camino correcto hacia el componente de tablero
import { Respuesta } from './respuesta';
import { CrearpreguntaService } from './crearpregunta.service';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `<app-tablero (tiradaDado)="moverFicha($event)">
  <app-ficha [posX]="fichaPosX" [posY]="fichaPosY"></app-ficha>
</app-tablero>
<ng-container id="cuestionarioContainer"></ng-container>
` ,
styleUrl: './app.component.css',
  imports: [FichaComponent,TableroComponent]
})


export class AppComponent implements OnInit  {
  fichaPosX: number = 0;
  fichaPosY: number = 0;
  consulta: string = "";
  respuestas: Respuesta[] = [];
  arrayAEnviar: string[] = [];
  constructor(private dadoService: DadoService,private crearPregunta: CrearpreguntaService) {}
  ngOnInit(): void{
    this.crearPregunta.crearpregunta("geografia");
    console.log(this.crearPregunta.esCorrecta);
  }
  moverFicha(resultadoDado: number): void {
    console.log('Resultado del dado:', resultadoDado);
    this.fichaPosX += resultadoDado * 50;
  }
  
}

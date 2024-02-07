// app.component.ts
import { Component, OnInit,ViewChild, ViewContainerRef, AfterViewInit,ChangeDetectorRef } from '@angular/core';
import { DadoService } from './dado.service'; // Asegúrate de tener el camino correcto hacia el servicio
import { FichaComponent } from './ficha/ficha.component'; // Asegúrate de tener el camino correcto hacia el componente de ficha
import { TableroComponent } from './tablero/tablero.component'; // Asegúrate de tener el camino correcto hacia el componente de tablero
import { Respuesta } from './respuesta';
import { CrearpreguntaService } from './crearpregunta.service';
import { CrearComponenteService } from './crear-componente.service';
import { Casilla } from './casilla';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `<app-tablero>
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
  
  constructor(private dadoService: DadoService,private crearPregunta: CrearpreguntaService,private prueba: CrearComponenteService) {}
  ngOnInit(): void{
  
  }
  insertarCuestionario(categoria:string,accion:(preguntaEsCorrecta:boolean)=> void){
    this.crearPregunta.crearpregunta(categoria);
    var sub = this.prueba.esCorrecta$.subscribe((val) =>{
      accion(val)
      sub.unsubscribe();
    })
  }

  moverFicha(resultadoDado: Casilla[]): void {
    console.log(resultadoDado)
  }
}

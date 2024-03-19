// app.component.ts
import { Component, OnInit,ViewChild, ViewContainerRef, AfterViewInit,ChangeDetectorRef } from '@angular/core';
import { TableroComponent } from './tablero/tablero.component'; // Asegúrate de tener el camino correcto hacia el componente de tablero
import { Respuesta } from './respuesta';
import { CrearpreguntaService } from './crearpregunta.service';
import { CrearComponenteService } from './crear-componente.service';
import { Casilla } from './casilla';
import { Subscription } from 'rxjs';
import { GestordeturnosService } from './gestordeturnos.service';
import { QuesitosService } from './quesitos.service';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `<app-tablero (tiradaDado$)="manejaraterrizaje($event)"></app-tablero>
<ng-container id="cuestionarioContainer"></ng-container>
` ,
styleUrl: './app.component.css',
  imports: [TableroComponent],
  providers: [GestordeturnosService,CrearpreguntaService,CrearComponenteService]
})


export class AppComponent implements AfterViewInit  {
  respuestas: Respuesta[] = [];
  sub: Subscription = new Subscription();
  quesitos: string[] = [];
  debounce: boolean = true;
  constructor(private crearPregunta: CrearpreguntaService,private prueba: CrearComponenteService,private tablero: TableroComponent,private gestorDeTurnos: GestordeturnosService,private handlerQuesitos: QuesitosService) {
    }
  ngAfterViewInit(): void {
    console.log("Aplicacion iniciada")
  }
  manejaraterrizaje(casilla: Casilla){
    
   this.insertarCuestionario(casilla.categoria,(preguntaEsCorrecta: boolean,categoria:string)=>{
    console.log("Respuesta: ",preguntaEsCorrecta)
      if (preguntaEsCorrecta && this.debounce){
        if (this.handlerQuesitos.findQuesito(categoria)==false){
        this.handlerQuesitos.cambiarColor(categoria)
        this.handlerQuesitos.addQuesito(categoria)
        this.debounce = false;
        }
      } else{
        this.debounce = true;
      }
  })
  }
  insertarCuestionario(categoria: string, accion: (preguntaEsCorrecta: boolean,categoria: string) => void) {
    if (categoria != ""){
      console.log(categoria)
    this.crearPregunta.crearpregunta(categoria);
    this.tablero.restringirtirada()
    } else {
      console.log(this.tablero.buscarFicha())
    }
    if (this.prueba.esCorrecta$) {
      this.sub = this.prueba.esCorrecta$.subscribe((val) => {
        accion(val,categoria);
        this.sub.unsubscribe();
        this.gestorDeTurnos.permitirTirada();
      });
    } else {
      console.error("La suscripción esCorrecta$ no está definida.");
    }
  }
  
  
}

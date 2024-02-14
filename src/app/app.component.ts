// app.component.ts
import { Component, OnInit,ViewChild, ViewContainerRef, AfterViewInit,ChangeDetectorRef } from '@angular/core';
import { FichaComponent } from './ficha/ficha.component'; // Asegúrate de tener el camino correcto hacia el componente de ficha
import { TableroComponent } from './tablero/tablero.component'; // Asegúrate de tener el camino correcto hacia el componente de tablero
import { Respuesta } from './respuesta';
import { CrearpreguntaService } from './crearpregunta.service';
import { CrearComponenteService } from './crear-componente.service';
import { Casilla } from './casilla';
import { Subscription } from 'rxjs';
import { GestordeturnosService } from './gestordeturnos.service';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `<app-tablero (tiradaDado$)="manejaraterrizaje($event)"></app-tablero>
<ng-container id="cuestionarioContainer"></ng-container>
` ,
styleUrl: './app.component.css',
  imports: [FichaComponent,TableroComponent],
  providers: [GestordeturnosService,CrearpreguntaService,CrearComponenteService]
})


export class AppComponent implements OnInit  {
  respuestas: Respuesta[] = [];
  sub: Subscription = new Subscription();
  constructor(private crearPregunta: CrearpreguntaService,private prueba: CrearComponenteService,private tablero: TableroComponent,private gestorDeTurnos: GestordeturnosService) {
    }
  ngOnInit(): void{
    console.log("Aplicacion iniciada")
  
    
  }
  ngAfterViewInit(): void {
    console.log("Desde fuera");
    
  }
  manejaraterrizaje(casilla: Casilla){
    
   this.insertarCuestionario(casilla.categoria,(preguntaEsCorrecta: boolean)=>{
    console.log("Respuesta: ",preguntaEsCorrecta)
      if (preguntaEsCorrecta){
        
      } else{

      }
  })
  }
  insertarCuestionario(categoria: string, accion: (preguntaEsCorrecta: boolean) => void) {
    if (categoria != ""){
      console.log(categoria)
    this.crearPregunta.crearpregunta(categoria);
    this.tablero.restringirtirada()
    } else {
      console.log(this.tablero.buscarFicha())
    }
    if (this.prueba.esCorrecta$) {
      this.sub = this.prueba.esCorrecta$.subscribe((val) => {
        accion(val);
        this.sub.unsubscribe();
        this.gestorDeTurnos.permitirTirada();
      });
    } else {
      console.error("La suscripción esCorrecta$ no está definida.");
    }
  }
  
  
}

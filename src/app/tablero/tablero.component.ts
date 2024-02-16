// tablero.component.ts
import { AfterViewInit, Component, ElementRef, EventEmitter, Injectable, OnInit, Output,Renderer2, ViewChild } from '@angular/core';
import { Casilla } from '../casilla';
import { Observable, Subject } from 'rxjs';
import { GestordeturnosService } from '../gestordeturnos.service';
import { take } from 'rxjs';
import { QuesitosService } from '../quesitos.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css'],
  standalone: true,
  animations: [
    trigger('victory', [
      state('inactive', style({
        transform: 'scale(1)',
        opacity: 0.5,
      })),
      state('active', style({
        transform: 'scale(1.2)',
        opacity: 1,
        height: '100px',
        flex: 1,
        margin: 'auto',
      })),
      transition('inactive => active', animate('500ms ease-in')),
    ]),
  ],
})

@Injectable({
  providedIn: 'root'
})

export class TableroComponent implements OnInit {
  resultado: string = "Tira los dados!";
 // public puedeTirar: boolean = true;
  estadoFicha: string = "A1"
  respuesta: Casilla = {categoria:  "",posicion: ""}
  
  public quesitos: HTMLElement[] = [];
  victoria = 'inactive'
  /*
   id="arte-y-literatura"></div>
 id="historia"></div>
 id="entretenimiento"></div>
 id="ciencias-y-naturaleza"></div>
 id="geografia"></div>
 id="deportes-y-pasatiempos"></div>
  */
  public quesitoDeporte: HTMLElement;
  public quesitoEntretenimiento: HTMLElement;
  public quesitoArte: HTMLElement;
  public quesitoCiencias: HTMLElement;
  public quesitoGeografia: HTMLElement;
  public quesitoHistoria: HTMLElement;
  
  public terrenoJuego!: HTMLElement;


  constructor(private elementRef: ElementRef, private turnos: GestordeturnosService,private manejoQuesos: QuesitosService,private renderer: Renderer2) {     this.quesitoGeografia = document.getElementById("geografia")!;
  this.quesitoHistoria = document.getElementById("historia")!;
  this.quesitoDeporte = document.getElementById("deportes-y-pasatiempos")!;
  this.quesitoEntretenimiento = document.getElementById("entretenimiento")!;
  this.quesitoArte = document.getElementById("arte-y-literatura")!;
  this.quesitoCiencias = document.getElementById("ciencias-y-naturaleza")!;}
  
  getQuesitos(): HTMLElement[]{
    return this.quesitos;
  }

  ngOnInit(): void {
    var categorias = ["arte-y-literatura", "geografia", "entretenimiento", "historia", "ciencias-y-naturaleza", "deportes-y-pasatiempos"];

    // Recorrer cada td y asignar una clase aleatoria de categorías
    var tds = document.querySelectorAll('td');
    tds.forEach(function (td) {
      var randomIndex = Math.floor(Math.random() * categorias.length);
      td.className = categorias[randomIndex];
    });
    var td = document.getElementById("A1"); // Cambia "A1" por la nueva ID
    var div = document.getElementById("ficha");

    if (td && div) {
      td.appendChild(div);

      const tdRect = td.getBoundingClientRect();
      const divWidth = div.offsetWidth;
      const divHeight = div.offsetHeight;

      const centerLeft = tdRect.left + (tdRect.width - divWidth) / 2;
      const centerTop = tdRect.top + (tdRect.height - divHeight) / 2;

      // Establecer las coordenadas para centrar el div
      div.style.position = 'absolute';
      div.style.left = `${centerLeft}px`;
      div.style.top = `${centerTop}px`;
    } else {
      console.error("El elemento con ID 'A1' o 'ficha' no fue encontrado.");
    }
    this.quesitoGeografia = document.getElementById("geografia")!;
    this.quesitoHistoria = document.getElementById("historia")!;
    this.quesitoDeporte = document.getElementById("deportes-y-pasatiempos")!;
    this.quesitoEntretenimiento = document.getElementById("entretenimiento")!;
    this.quesitoArte = document.getElementById("arte-y-literatura")!;
    this.quesitoCiencias = document.getElementById("ciencias-y-naturaleza")!;
    if (this.quesitoArte && this.quesitoCiencias && this.quesitoDeporte && this.quesitoEntretenimiento && this.quesitoGeografia && this.quesitoHistoria){
      this.quesitos.push(this.quesitoArte, this.quesitoCiencias, this.quesitoDeporte , this.quesitoEntretenimiento , this.quesitoGeografia , this.quesitoHistoria)
      console.log(this.quesitos)
      this.manejoQuesos.setQuesitos(this.quesitos);
    } else{
      console.log("Alguno de los quesitos es null","\nArte",this.quesitoArte,"\nCiencias", this.quesitoCiencias,"\nDeporte", this.quesitoDeporte ,"\nEntretenimiento", this.quesitoEntretenimiento ,"\nGeografia", this.quesitoGeografia , "\nHistoria",this.quesitoHistoria)
    }
    this.terrenoJuego = document.getElementById("contenedor-juego")!
   
  }
  @Output() tiradaDado$ = new EventEmitter<Casilla>();
  buscarFicha(): string{
    const td = this.elementRef.nativeElement.querySelector('td > div').parentElement;
    return td.id
  }
  permitirtirada(): void{
    this.turnos.permitirTirada();
  }
  restringirtirada(): void{
    this.turnos.restringirTirada();
  }
  tirarDado(): void {
    this.turnos.puedetirar$.pipe(take(1)).subscribe((puedeTirar) =>{
      console.log("Puede tirar",puedeTirar)
      console.log(this.manejoQuesos.getQuesitosCorrectos(),this.manejoQuesos.getQuesitosCorrectos().length)
    const filas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
    if (puedeTirar) {
      if (this.manejoQuesos.getQuesitosCorrectos().length !=6){
      const tirada = Math.floor(Math.random() * (6 - 1)) + 1;
      this.resultado = "Resultado: " + tirada;
  
      const div = document.getElementById("ficha");
  
      if (div && div.parentNode) {
        const posicionActual = div?.parentNode as HTMLElement;
        const casilla = parseInt(posicionActual.id.substring(1), 10);
        const filaActual = posicionActual.id.substring(0, 1);
  
        console.log("Casilla actual:", casilla);
        
        let casillaDestino: HTMLElement | null = null;
  
        const casillasRestantes = 11 - casilla;  // Número de casillas restantes en la fila actual
  
        if (tirada > casillasRestantes) {
          // Mover a la fila siguiente
          const indexFilaActual = filas.indexOf(filaActual);
          if (indexFilaActual !== -1 && indexFilaActual + 1 < filas.length) {
            const filaSiguiente = filas[indexFilaActual + 1];
            console.log("Mover a la fila siguiente:", filaSiguiente);
            const casillaDado = tirada - casillasRestantes;
  
            casillaDestino = document.getElementById(filaSiguiente + casillaDado.toString());
          }
        } else {
          // Mover dentro de la misma fila
          const casillaDado = casilla + tirada;
          casillaDestino = document.getElementById(filaActual + casillaDado.toString());
        }
  
        if (casillaDestino) {
          // Asegurarse de que el div esté visible antes de cambiar de padre
          div.style.display = 'block';
  
          // Mover la ficha al nuevo destino
          casillaDestino.appendChild(div);
  
          // Ajustar estilos después de moverlo
          const tdRect = casillaDestino.getBoundingClientRect();
          const divWidth = div.offsetWidth;
          const divHeight = div.offsetHeight;
  
          const centerLeft = tdRect.left + (tdRect.width - divWidth) / 2;
          const centerTop = tdRect.top + (tdRect.height - divHeight) / 2;
  
          // Ajustar estilos
          div.style.position = 'absolute';
      //    div.style.left = `${centerLeft}px`;
        //  div.style.top = `${centerTop}px`;
          this.respuesta.categoria= casillaDestino.className
          this.respuesta.posicion= casillaDestino.id;
          this.tiradaDado$.emit(this.respuesta)
          this.restringirtirada();
      }
      }
    }
  } else if(this.manejoQuesos.getQuesitosCorrectos().length == 6) {
    this.terrenoJuego.style.display="none";
    this.terrenoJuego.innerHTML = ""
      this.victoria = 'active'
    if (this.terrenoJuego){
      this.terrenoJuego.remove()
    }
  }
  })
  }
  
}
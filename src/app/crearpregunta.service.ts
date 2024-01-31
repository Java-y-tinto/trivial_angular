import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { CrearComponenteService } from './crear-componente.service';
import { Subscription, skip } from 'rxjs';
import { Respuesta } from './respuesta';
//todo el berenjenal que he armado en una sola funcion :D
@Injectable({
  providedIn: 'root'
})
export class CrearpreguntaService {
  private respuestas: Respuesta[] = []
  private enunciado: string = ""
  public esCorrecta: boolean = false;
  private suscripcion: Subscription = new Subscription();
  constructor(private DB: DatabaseService,private cuestionario: CrearComponenteService) { 
    this.cuestionario.esCorrecta$.pipe(skip(1)).subscribe((val) =>{
      this.esCorrecta=val
      this.suscripcion.unsubscribe();
    })
  }
  
  crearpregunta(categoria: string){
      this.suscripcion = this.DB.getPreguntaporCategoria(categoria).subscribe((val)=>{
        var preguntaElegida = val[Math.floor(Math.random() * val.length)]
        this.enunciado= preguntaElegida.pregunta;
        this.respuestas = [
          {respuesta: preguntaElegida.respuestaCorrecta, esCorrecta: true},
           {respuesta: preguntaElegida.respuestaIncorrecta1, esCorrecta: false},
           {respuesta: preguntaElegida.respuestaIncorrecta2, esCorrecta:false},
           {respuesta: preguntaElegida.respuestaIncorrecta3, esCorrecta:false}
         ];
      })
      this.cuestionario.insertarCuestionario(this.enunciado,this.respuestas)
  }
}

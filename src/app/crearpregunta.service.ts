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
  private suscripcion: Subscription = new Subscription();
  constructor(private DB: DatabaseService,private cuestionario: CrearComponenteService) { }
  
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
      setTimeout(() => {
        this.cuestionario.insertarCuestionario(this.enunciado,this.respuestas)
      }, 3);
  }
}

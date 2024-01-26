import { Injectable, ViewContainerRef} from '@angular/core';
import { CuestionarioComponent } from './cuestionario/cuestionario.component';
import { Respuesta } from './respuesta';

@Injectable({
  providedIn: 'root'
})
export class CrearComponenteService {
  
  constructor() { }
  insertarCuestionario(viewContainerRef: ViewContainerRef,enunciado: string,respuestas: Respuesta[]){
    console.log("Me han llamado en el servicio")
    
    const componentRef = viewContainerRef.createComponent(CuestionarioComponent);
    
    componentRef.instance.enunciado = enunciado;
    componentRef.instance.respuestas = respuestas;
    console.log(componentRef.instance.enunciado)
    console.log(componentRef.instance.respuestas)
    
  }

}

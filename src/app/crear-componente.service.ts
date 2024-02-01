import { Inject, Injectable, ViewContainerRef} from '@angular/core';
import { CuestionarioComponent } from './cuestionario/cuestionario.component';
import { Respuesta } from './respuesta';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrearComponenteService {
  private observableCorreccion = new BehaviorSubject<boolean>(false);
  public esCorrecta$ = this.observableCorreccion.asObservable();
  actualizarCorreccion(nuevoValor: boolean){
    this.observableCorreccion.next(nuevoValor);
  }

  constructor(private overlay: Overlay) { }
  insertarCuestionario(enunciado: string,respuestas: Respuesta[]){
    console.log("Me han llamado en el servicio")
    const overlayRef = this.createOverlay();
    const componentPortal = new ComponentPortal(CuestionarioComponent);
    const componentRef = overlayRef.attach(componentPortal);    
    componentRef.instance.enunciado = enunciado;
    componentRef.instance.respuestas = respuestas;
    componentRef.instance.eventoCorreccion.subscribe((val)=>{
      this.actualizarCorreccion(val);
      componentRef.instance.eventoCorreccion.unsubscribe()
      componentRef.destroy()
    })
  }
  private createOverlay(): OverlayRef {
    // Configurar la superposición
    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'overlay-backdrop',
      positionStrategy: this.overlay.position().global().centerHorizontally().top('0')
    });

    // Crear y devolver la superposición
    return this.overlay.create(overlayConfig);
  }
}


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuesitosService {

  constructor() { }
  public colorDefecto = "#000000"
  public colorGeografia = "#00ffff"
  public colorEntretenimiento = "#ff738a"
  public colorHistoria = "#ffff00"
  public colorDeportes = "#ffa500"
  public colorCiencias = "#008000"
  public colorArte = "#800080"

  public quesitos: HTMLElement[] = [];
  public quesitosCorrectos: string[] = []

  public addQuesito(categoria: string): void{
    const quesitoConseguido = this.quesitos.find((quesito) => quesito.id === categoria)
    if (quesitoConseguido){
      this.quesitosCorrectos.push(quesitoConseguido.id)
      this.cambiarColor(quesitoConseguido.id)
    }
  }
  public findQuesito(categoria: string): boolean {
    const quesito = this.quesitos.find((quesito) => quesito.id === categoria)?.id;
  
    for (let index of this.quesitosCorrectos) {
      console.log(index, quesito);
      if (quesito?.includes(index)) {
        return true;
      }
    }
  
    return false;
  }
  
  public getQuesitosCorrectos(): string[]{
    return this.quesitosCorrectos
  }

  public cambiarColor(categoria:string): void{
    const elemento = this.quesitos.find((quesito) => quesito.id === categoria);

    if (elemento) {
      switch (categoria) {
        case "geografia":
          elemento.style.backgroundColor = this.colorGeografia;
          break;
        case "historia":
          elemento.style.backgroundColor = this.colorHistoria;
          break;
        case "entretenimiento":
          elemento.style.backgroundColor = this.colorEntretenimiento;
          break;
        case "arte-y-literatura":
          elemento.style.backgroundColor = this.colorArte;
          break;
        case "ciencias-y-naturaleza":
          elemento.style.backgroundColor = this.colorCiencias;
          break;
        case "deportes-y-pasatiempos":
          elemento.style.backgroundColor = this.colorDeportes;
          break;
        default:
          break;
      }
    }
  }public cambiarColorANegro(categoria:string): void{
    const elemento = this.quesitos.find((quesito) => quesito.id === categoria);

    if (elemento) {
      elemento.style.backgroundColor=this.colorDefecto;
    }
  }
  setQuesitos(quesitos: HTMLElement[]): void {
    this.quesitos = quesitos;
  }
}

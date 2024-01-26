import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DadoService {

  tirardado(): number {
    return  Math.floor(Math.random()*(6-1)) + 1
  }
}

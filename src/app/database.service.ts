import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParamsOptions } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class DatabaseService {
private urlBackend = "http://127.0.0.1:3000"
private http = inject( HttpClient )
  constructor() { }

  getPreguntaporCategoria(categoria: string): Observable<any[]> {
    const endpoint = `${this.urlBackend}/preguntas/${categoria}`
    console.log(this.urlBackend)
    return this.http.get<any>(endpoint)
  }
}

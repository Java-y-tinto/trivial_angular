import { Routes } from '@angular/router';
import { TableroComponent } from './tablero/tablero.component';
import { AppComponent } from './app.component';

export const routes: Routes = [{
    path: 'tablero',
    component: TableroComponent
},
{
    path: 'prueba',
    component: AppComponent
}];

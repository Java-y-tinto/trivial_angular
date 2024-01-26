// ficha.component.ts
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-ficha',
  template: `
    <div [style.left.px]="posX" [style.top.px]="posY" class="ficha"></div>
  `,
  styles: [`
    .ficha {
      position: absolute;
      width: 40px;
      height: 40px;
      background-color: red;
      border-radius: 50%;
    }
  `],
})
export class FichaComponent implements OnChanges {
  @Input() posX: number = 0;
  @Input() posY: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Ficha movida a:', this.posX, this.posY);
  }
}

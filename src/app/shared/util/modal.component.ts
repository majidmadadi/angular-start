import {Component, contentChild, effect, inject, input, output, TemplateRef, viewChild} from '@angular/core';
import {Dialog} from '@angular/cdk/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'modal',
  template: `
    <ng-template>
      <div class="title">
        <button matButton (click)="close.emit()">Close</button>
      </div>
      <ng-content></ng-content>
    </ng-template>
  `,
  imports: [
    MatButton
  ],
  styles: [`
    .title {
      top: 0;
      right: 0;
      position: relative;
    }
  `]
})
export class ModalComponent {
  readonly dialog = inject(Dialog);
  show= input.required<boolean>();
  close= output();
  readonly template= viewChild.required(TemplateRef);

  constructor() {
    effect(() => {
      if(this.show()){
        this.dialog.open(this.template(),{
          panelClass: 'modal-panel',
          hasBackdrop: false
        });
      }else{
        this.dialog.closeAll();
      }
    });
  }
}

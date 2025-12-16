import {Component, contentChild, effect, inject, input, TemplateRef, viewChild} from '@angular/core';
import {Dialog} from '@angular/cdk/dialog';

@Component({
  selector: 'modal',
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `,
  styles:[``]
})
export class ModalComponent {
  readonly dialog = inject(Dialog);
  show= input.required<boolean>();
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

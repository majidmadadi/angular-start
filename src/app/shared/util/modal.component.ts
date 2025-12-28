import {Component, effect, inject, input, output, TemplateRef, viewChild} from '@angular/core';
import {Dialog} from '@angular/cdk/dialog';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'modal',
  template: `
    <ng-template>
      <div class="title">
        <button matIconButton (click)="close.emit()">
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <ng-content></ng-content>
    </ng-template>
  `,
  imports: [
    MatIcon,
    MatIconButton
  ],
  styles: [`
    .title {
      display: flex;
      justify-content: flex-end;
      align-items: center;
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

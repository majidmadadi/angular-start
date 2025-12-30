import {Component, effect, ElementRef, input, output, viewChild} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {focusElement} from '../../../shared/util/dom.util';

@Component({
  selector: 'app-edit-item',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="space-between">
      <h4>{{title()}}</h4>
    </div>
    <form [formGroup]="formGroup()" (ngSubmit)="save.emit(); close.emit()">
      <mat-form-field>
        <mat-label>Title</mat-label>
        <input #inputTitle
               matInput width="100%" placeholder="Title" formControlName="title"
               id="title"
        />
      </mat-form-field>
      <div class="space-between">
        <button matButton>Add</button>
      </div>
    </form>
  `,
  styles: [`
    mat-form-field {
      width: 100%;
    }
  `]
})
export class EditItemComponent {
  formGroup= input.required<FormGroup>();
  save= output();
  close= output();
  title= input.required<string>()
  visible= input<boolean>()
  inputElement= viewChild.required<ElementRef>('inputTitle')

  constructor() {
    effect(() => {
      if(this.visible()){
        focusElement(this.inputElement())
      }
    });
  }
}

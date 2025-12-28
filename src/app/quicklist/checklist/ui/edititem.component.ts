import {Component, input, model, output} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

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
    <form [formGroup]="formGroup()" (ngSubmit)="save.emit()">
      <mat-form-field>
        <mat-label>Title</mat-label>
        <input matInput placeholder="Title" formControlName="title"/>
      </mat-form-field>
      <div>
        <button matButton>Add</button>
      </div>
    </form>
  `
})
export class EditItemComponent {
  formGroup= input.required<FormGroup>();
  save= output();
}

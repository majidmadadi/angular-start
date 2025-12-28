import {Component, input, output} from '@angular/core';
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
        <input matInput width="100%" placeholder="Title" formControlName="title"/>
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
}

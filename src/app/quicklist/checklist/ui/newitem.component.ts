import {Component} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-edit-item',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatButton
  ],
  template: `
    <mat-form-field>
      <mat-label>Title</mat-label>
      <input matInput placeholder="Title"/>
    </mat-form-field>
    <div>
      <button matButton>Add</button>
    </div>
  `
})
export class NewItemComponent {

}

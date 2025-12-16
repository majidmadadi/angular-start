import {Component, input, OnInit, output} from '@angular/core';
import {ChecklistItem} from '../checklistItem';
import {MatList, MatListItem} from '@angular/material/list';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-listitems',
  imports: [
    MatList,
    MatListItem,
    MatButton
  ],
  template: `
    <mat-list>
      @for (item of items(); track item.id) {
        <mat-list-item>
          {{item.title}}
          <button matButton (click)="editItem.emit(item)">Edit</button>
          <button matButton (click)="deleteItem.emit(item.id)">Delete</button>
        </mat-list-item>
      }
    </mat-list>
  `
})
export class ListItemsComponent{
  items= input<ChecklistItem[]>([]);
  editItem= output<ChecklistItem>();
  deleteItem= output<string>();
}

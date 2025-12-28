import {Component, input, output} from '@angular/core';
import {ChecklistItem} from '../types';
import {MatList, MatListItem, MatListItemMeta} from '@angular/material/list';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-listitems',
  imports: [
    MatList,
    MatListItem,
    MatIconButton,
    MatIcon,
    MatListItemMeta
  ],
  template: `
    <mat-list>
      @for (item of items(); track item.id) {
        <mat-list-item>
          <span>{{item.title}}</span>
          <div matListItemMeta>
            <button matIconButton (click)="editItem.emit(item)">
              <mat-icon>edit</mat-icon>
            </button>
            <button matIconButton (click)="deleteItem.emit(item.id)">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
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

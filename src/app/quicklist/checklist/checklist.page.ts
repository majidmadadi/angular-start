import {Component, inject, signal} from '@angular/core';
import {MatButton, MatMiniFabButton} from '@angular/material/button';
import {ModalComponent} from '../../shared/util/modal.component';
import {MatIcon} from '@angular/material/icon';
import {ListItemsComponent} from './ui/listItems.component';
import {ChecklistService} from './checklist.service';
import {ChecklistItem} from './checklistItem';

@Component({
  selector: 'checklist',
  imports: [
    MatButton,
    ModalComponent,
    MatIcon,
    MatMiniFabButton,
    ListItemsComponent
  ],
  template: `
    <header>
      <h1 class="mat-display-1">QuickLists</h1>
      <button matButton="outlined" (click)="showModal.set(true)">Add Item</button>
    </header>
    <main>
      <modal [show]="showModal()">
        <div>
          <div class="space-between">
            <h4>Add new item</h4>
            <button matMiniFab (click)="showModal.set(false)">
              <mat-icon>close</mat-icon>
            </button>
          </div>
          <div>

          </div>
          <div class="space-between">
            <button matButton>Save</button>
          </div>
        </div>
      </modal>

      <app-listitems [items]="checklistService.listItems()"
                     (editItem)="checklistService.editItem$.next($event)"
                     (deleteItem)="checklistService.deleteItem$.next($event)"></app-listitems>

    </main>
  `,
  styles: [`
    header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  `]
})
export class ChecklistPage {
  showModal= signal(false);
  beingEditedItem= signal<ChecklistItem|{}>({})
  checklistService= inject(ChecklistService);

}

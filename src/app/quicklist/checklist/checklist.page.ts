import {Component, effect, inject, signal} from '@angular/core';
import {MatButton, MatMiniFabButton} from '@angular/material/button';
import {ModalComponent} from '../../shared/util/modal.component';
import {ListItemsComponent} from './ui/listItems.component';
import {ChecklistService} from './checklist.service';
import {ChecklistItem} from './types';
import {EditItemComponent} from './ui/edititem.component';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'checklist',
  imports: [
    MatButton,
    ModalComponent,
    ListItemsComponent,
    EditItemComponent,
    ReactiveFormsModule
  ],
  template: `
    <header>
      <h1 class="mat-display-1">QuickLists</h1>
      <button matButton="outlined" (click)="beingEditedItem.set({})">Add Item</button>
    </header>
    <main>
      <modal [show]="!!beingEditedItem()" (close)="beingEditedItem.set(null)">
        <div>
          <div class="space-between">
            <h4>Add new item</h4>
          </div>
          <div>
            <app-edit-item [formGroup]="formGroup"
                           (save)="beingEditedItem()?.id
                             ? checklistService.editItem$.next({
                                id:beingEditedItem()!.id!,
                                data: formGroup.getRawValue(),
                            })
                            :checklistService.addItem$.next(formGroup.getRawValue())"></app-edit-item>
          </div>
          <div class="space-between">
            <button matButton>Save</button>
          </div>
        </div>
      </modal>

      <app-listitems [items]="checklistService.listItems()"
                     (editItem)="beingEditedItem.set($event)"
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
  beingEditedItem= signal<Partial<ChecklistItem>|null>(null);
  checklistService= inject(ChecklistService);
  fb= inject(FormBuilder);
  formGroup= this.fb.nonNullable.group({
    title:['', Validators.required],
  })

  constructor() {
    effect(() => {
      const item = this.beingEditedItem();
      if(!item?.id){
        this.formGroup.reset();
      }
    });
  }
}

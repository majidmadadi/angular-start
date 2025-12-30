import {effect, inject, Injectable, linkedSignal} from '@angular/core';
import {Subject} from 'rxjs';
import {AddChecklistItem, EditChecklistItem, RemoveChecklistItem} from './types';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {StorageService} from './storage.service';
import "../../shared/util/array.util";
import {sortById} from '../../shared/util/array.util';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  protected readonly storage = inject(StorageService);

  checklistItemsResource = this.storage.loadItemsAsync();
  addItem$ = new Subject<AddChecklistItem>();
  editItem$ = new Subject<EditChecklistItem>();
  deleteItem$ = new Subject<RemoveChecklistItem>();

  listItems = linkedSignal({
    source: this.checklistItemsResource.value,
    computation: items => items ?? []
  });

  constructor() {
    this.addItem$
      .pipe(takeUntilDestroyed())
      .subscribe((x) =>
        this.listItems.update(s =>
          sortById([...s, {
            id: new Date().getTime().toString(),
            title: x.title,
          }])));

    this.editItem$
      .pipe(takeUntilDestroyed())
      .subscribe((x) =>
        this.listItems.update(s => sortById([...s.filter(f => f.id !== x.id), {
          id: x.id,
          title: x.data.title
        }])));

    this.deleteItem$
      .pipe(takeUntilDestroyed())
      .subscribe(id =>
        this.listItems.update(
          s => sortById([...s.filter(f => f.id !== id)])
        )
      );

    effect(() => {
      const checklistItems = this.listItems();
      if (this.checklistItemsResource.status() === "resolved") {
        this.storage.saveChecklistItems(checklistItems);
      }
    });
  }
}

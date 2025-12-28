import {computed, inject, Injectable, signal} from '@angular/core';
import {Subject} from 'rxjs';
import {AddChecklistItem, ChecklistItem, EditChecklistItem, RemoveChecklistItem} from './types';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  protected readonly state=
    signal<ChecklistItem[]>([{id:'1',title:'First list item'}])

  addItem$ = new Subject<AddChecklistItem>();
  editItem$ = new Subject<EditChecklistItem>();
  deleteItem$ = new Subject<RemoveChecklistItem>();

  listItems = computed(()=> this.state())

  constructor() {
      this.addItem$
        .pipe(takeUntilDestroyed())
        .subscribe((x)=>this.state.update(s=>[...s,{
          id:new Date().getTime().toString(),
          title:x.title,
        }]));

      this.editItem$
        .pipe(takeUntilDestroyed())
        .subscribe((x)=>
          this.state.update(s=>[...s.filter(f=>f.id!==x.id),{
            id:x.id,
            title:x.data.title
          }]));

      this.deleteItem$
        .pipe(takeUntilDestroyed())
        .subscribe(id=>this.state.update(s=>[...s.filter(f=>f.id!==id)]));
  }

}

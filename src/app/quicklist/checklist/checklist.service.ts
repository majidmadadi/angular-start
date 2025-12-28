import {computed, Injectable, signal} from '@angular/core';
import {ChecklistEditItem, ChecklistItem} from './types';
import {Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  protected readonly state=
    signal<ChecklistItem[]>([{id:'1',title:'First list item'}])

  addItem$ = new Subject<{ title:string }>();
  editItem$ = new Subject<ChecklistEditItem>();
  deleteItem$ = new Subject<string>();

  listItems = computed(()=> this.state())

  constructor() {
      this.addItem$
        .pipe(takeUntilDestroyed())
        .subscribe(x=>this.state.update(s=>[...s,{
          id:new Date().getTime().toString(),
          title:x.title
        }]));

      this.editItem$
        .pipe(takeUntilDestroyed())
        .subscribe(x=>
          this.state.update(s=>[...s.filter(f=>f.id!==x.id),{
            id:x.id,
            title:x.data.title
          }]));

      this.deleteItem$
        .pipe(takeUntilDestroyed())
        .subscribe(id=>this.state.update(s=>[...s.filter(f=>f.id!==id)]));
  }

}

import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

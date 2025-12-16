import {computed, Injectable, signal} from '@angular/core';
import {ChecklistItem} from './checklistItem';
import {Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  protected readonly state=
    signal<ChecklistItem[]>([{id:'1',title:'First list item'}])

  addItem$ = new Subject<ChecklistItem>();
  editItem$ = new Subject<ChecklistItem>();
  deleteItem$ = new Subject<string>();

  listItems = computed(()=> this.state())

  constructor() {
      this.addItem$
        .pipe(takeUntilDestroyed())
        .subscribe(x=>this.state.update(s=>[...s,x]));

      this.editItem$
        .pipe(takeUntilDestroyed())
        .subscribe(x=>this.state.update(s=>[...s.filter(f=>f.id!==x.id),x]));

      this.deleteItem$
        .pipe(takeUntilDestroyed())
        .subscribe(id=>this.state.update(s=>[...s.filter(f=>f.id!==id)]));
  }

}

import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

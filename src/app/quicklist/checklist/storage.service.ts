import {inject, Injectable, InjectionToken, PLATFORM_ID, resource} from '@angular/core';
import {ChecklistItem} from './types';

export const LOCAL_STORAGE=new InjectionToken<Storage>(
  'local storage',
  {
    providedIn: 'root',
    factory: () => {
      if(inject(PLATFORM_ID)==='browser'){
        return window.localStorage;
      }else
        return {} as Storage;
    }
  });

@Injectable({
  providedIn: 'root'
})
export class StorageService{
  private readonly key='CHECKLIST';
  private readonly localStorage= inject(LOCAL_STORAGE);

  loadItemsAsync(){
    return resource({
      loader: () =>
        Promise.resolve(this.localStorage.getItem(this.key))
          .then(str=> (str?JSON.parse(str):[]) as ChecklistItem[])
    });
  }

  saveChecklistItems(items: ChecklistItem[]){
    this.localStorage.setItem(this.key, JSON.stringify(items));
  }

}

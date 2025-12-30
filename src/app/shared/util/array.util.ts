import {ChecklistItem} from '../../quicklist/checklist/types';

export function sortById(list: ChecklistItem[]){
    return list.sort((a:ChecklistItem,b:ChecklistItem)=>a.id.localeCompare(b.id));
}

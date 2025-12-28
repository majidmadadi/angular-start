export type ChecklistItem = {
  id: string;
  title: string;
}
export type AddChecklistItem = Omit<ChecklistItem, 'id'>;
export type RemoveChecklistItem = ChecklistItem['id'];
export type EditChecklistItem = {
  id: string;
  data: AddChecklistItem;
};

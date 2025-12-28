export interface ChecklistItem {
  id: string;
  title: string;
}

export interface ChecklistEditItem{
  id: string;
  data: {
    title: string;
  }
}

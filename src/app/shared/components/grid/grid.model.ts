export interface SortableItem {
  name: string;
  value: string;
}

export interface SortableValue {
  field: string;
  type: 'ASC' | 'DESC';
}

export type SearchableField = string;

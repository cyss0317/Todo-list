export interface TodoData {
  description: string;
  done: boolean;
  inProgress: boolean;
  dueDate: string;
  tags: Array<string>;
}

export interface TodoId {
  _id: string;
}

export interface TodoPartialUpdate {
  description?: string;
  done?: boolean;
  inProgress?: boolean;
  dueDate?: string;
  tags?: Array<string>;
}

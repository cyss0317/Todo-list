export interface Todo {
  description: string;
  done: boolean;
  inProgress: boolean;
  dueDate: string;
  tags: Array<string>;
}

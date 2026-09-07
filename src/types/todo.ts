export type TodoStatus = 'open' | 'done';

export interface Todo {
  id: number;
  text: string;
  status: TodoStatus;
}

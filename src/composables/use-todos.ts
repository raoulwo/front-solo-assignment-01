import type { Todo } from '@/types/todo';
import { ref, watch } from 'vue';

export function useTodos() {
  const TODOS_KEY = 'todo-app-todos';

  const savedTodos = localStorage.getItem(TODOS_KEY);
  const initialTodos: Todo[] = savedTodos
    ? JSON.parse(savedTodos)
    : [
        {
          id: 1,
          text: 'Setup todo app',
          status: 'done',
        },
        {
          id: 2,
          text: 'Finish todo app',
          status: 'open',
        },
      ];

  const todos = ref<Todo[]>(initialTodos);

  let nextId = todos.value.length > 0 ? Math.max(...todos.value.map((todo) => todo.id)) + 1 : 1;

  watch(
    todos,
    (newTodos) => {
      localStorage.setItem(TODOS_KEY, JSON.stringify(newTodos));
    },
    { deep: true },
  );

  function createTodo(text: string) {
    if (!text.trim()) {
      return;
    }

    todos.value.push({
      id: nextId++,
      text: text.trim(),
      status: 'open',
    });
  }

  function toggleTodo(id: number) {
    const todo = todos.value.find((todo) => todo.id === id);
    if (todo) {
      todo.status = todo.status === 'done' ? 'open' : 'done';
    }
  }

  function deleteTodo(id: number) {
    todos.value = todos.value.filter((todo) => todo.id !== id);
  }

  return {
    todos,
    createTodo,
    toggleTodo,
    deleteTodo,
  };
}

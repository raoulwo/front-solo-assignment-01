<script setup lang="ts">
import type { Todo } from '@/types/todo';
import TodoList from './TodoList.vue';
import { ref } from 'vue';
import Input from './ui/input/Input.vue';
import Button from './ui/button/Button.vue';

const todos = ref<Todo[]>([
  {
    id: 1,
    text: 'Setup Todo App',
    status: 'done',
  },
  {
    id: 2,
    text: 'Finish Todo App',
    status: 'open',
  },
]);

let nextId = 3;
const newTodoText = ref<string>('');

function createTodo() {
  if (!newTodoText.value.trim()) {
    return;
  }

  todos.value.push({
    id: nextId++,
    text: newTodoText.value.trim(),
    status: 'open',
  });

  newTodoText.value = '';
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
</script>

<template>
  <div class="mx-auto w-full max-w-2xl space-y-8 p-16">
    <div class="flex items-center justify-between space-x-4">
      <Input
        type="text"
        placeholder="Buy groceries..."
        v-model="newTodoText"
        @keydown.enter="createTodo"
      />
      <Button class="cursor-pointer" @click="createTodo">Create</Button>
    </div>
    <div class="mt-16">
      <TodoList :todos="todos" @delete="deleteTodo" @toggle="toggleTodo" />
    </div>
  </div>
</template>

<style scoped></style>

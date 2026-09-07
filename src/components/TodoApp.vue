<script setup lang="ts">
import type { Todo } from '@/types/todo';
import TodoList from './TodoList.vue';
import { computed, ref } from 'vue';
import Input from './ui/input/Input.vue';
import Button from './ui/button/Button.vue';
import Badge from './ui/badge/Badge.vue';
import { useTodos } from '@/composables/use-todos.ts';

const { todos, createTodo, toggleTodo, deleteTodo } = useTodos();

const newTodoText = ref<string>('');
const currentFilter = ref<'all' | 'open' | 'done'>('all');

const filteredTodos = computed<Todo[]>(() => {
  if (currentFilter.value === 'open') {
    return todos.value.filter((todo) => todo.status === 'open');
  }

  if (currentFilter.value === 'done') {
    return todos.value.filter((todo) => todo.status === 'done');
  }

  return todos.value;
});

function createTodoItem() {
  createTodo(newTodoText.value);
  newTodoText.value = '';
}
</script>

<template>
  <div class="mx-auto w-full max-w-2xl space-y-8 p-16">
    <div class="flex items-center justify-between space-x-4">
      <Input
        type="text"
        placeholder="Buy groceries..."
        v-model="newTodoText"
        @keydown.enter="createTodoItem"
      />
      <Button class="cursor-pointer" @click="createTodoItem">Create</Button>
    </div>
    <div class="mt-16 space-y-4">
      <div class="flex gap-2">
        <Badge
          :variant="currentFilter === 'all' ? 'default' : 'outline'"
          class="cursor-pointer px-2 py-1"
          @click="currentFilter = 'all'"
        >
          All
        </Badge>
        <Badge
          :variant="currentFilter === 'open' ? 'default' : 'outline'"
          class="cursor-pointer px-2 py-1"
          @click="currentFilter = 'open'"
        >
          Open
        </Badge>
        <Badge
          :variant="currentFilter === 'done' ? 'default' : 'outline'"
          class="cursor-pointer px-2 py-1"
          @click="currentFilter = 'done'"
        >
          Done
        </Badge>
      </div>

      <TodoList :todos="filteredTodos" @delete="deleteTodo" @toggle="toggleTodo" />
    </div>
  </div>
</template>

<style scoped></style>

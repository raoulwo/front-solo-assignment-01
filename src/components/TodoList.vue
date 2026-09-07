<script setup lang="ts">
import type { Todo } from '@/types/todo';
import TodoItem from './TodoItem.vue';

defineProps<{
  todos: Todo[];
}>();

const emit = defineEmits<{
  delete: [id: number];
  toggle: [id: number];
}>();
</script>

<template>
  <div class="flex flex-col gap-4">
    <TodoItem
      v-for="todo in todos"
      :todo="todo"
      :key="todo.id"
      @delete="emit('delete', todo.id)"
      @toggle="emit('toggle', todo.id)"
    />
  </div>
</template>

<style scoped></style>

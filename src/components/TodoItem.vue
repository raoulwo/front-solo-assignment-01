<script setup lang="ts">
import type { Todo } from '@/types/todo';
import Item from './ui/item/Item.vue';
import ItemTitle from './ui/item/ItemTitle.vue';
import ItemActions from './ui/item/ItemActions.vue';
import Button from './ui/button/Button.vue';
import { Trash } from '@lucide/vue';
import Checkbox from './ui/checkbox/Checkbox.vue';

const props = defineProps<{
  todo: Todo;
}>();

const emit = defineEmits<{
  delete: [id: number];
  toggle: [id: number];
}>();

function isDone(): boolean {
  return props.todo.status === 'done';
}
</script>

<template>
  <Item variant="outline" class="flex items-center justify-between p-3">
    <div class="flex items-center space-x-3">
      <ItemActions class="pl-1">
        <Checkbox
          :model-value="isDone()"
          class="cursor-pointer"
          @update:model-value="emit('toggle', todo.id)"
        />
      </ItemActions>
      <ItemTitle :class="{ 'text-muted-foreground line-through': isDone() }">{{
        todo.text
      }}</ItemTitle>
    </div>

    <ItemActions>
      <Button
        variant="destructive"
        size="icon-sm"
        class="cursor-pointer"
        @click="emit('delete', todo.id)"
      >
        <Trash />
      </Button>
    </ItemActions>
  </Item>
</template>

<style scoped></style>

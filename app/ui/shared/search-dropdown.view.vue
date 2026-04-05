<script setup lang="ts">
import type { SearchSuggestion } from '~/composables/use-search-suggestions'

defineProps<{
  suggestions: readonly SearchSuggestion[]
}>()

const emit = defineEmits<{ select: [name: string] }>()
</script>

<template>
  <div v-if="suggestions.length > 0" class="dropdown">
    <div v-for="s in suggestions" :key="s.name" class="dropdown-item" @mousedown.prevent="emit('select', s.name)">
      <span class="dropdown-name">{{ s.name }}</span>
      <span class="dropdown-desc">{{ s.description }}</span>
    </div>
  </div>
</template>

<style scoped>
.dropdown { position: absolute; top: calc(100% + 6px); left: 0; right: 0; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-md); overflow: hidden; z-index: 200; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4); }
.dropdown-item { padding: 10px 16px; cursor: pointer; display: flex; gap: 10px; align-items: baseline; transition: background 0.1s; }
.dropdown-item:hover { background: var(--bg-input); }
.dropdown-name { font-weight: 600; color: var(--accent); font-size: 14px; white-space: nowrap; }
.dropdown-desc { font-size: 12px; color: var(--text-dim); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>

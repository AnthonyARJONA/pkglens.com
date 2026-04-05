<script setup lang="ts">
import { ECOSYSTEMS, type EcosystemId } from '~/core/ecosystem/ecosystem.types'

defineProps<{
  activeId: EcosystemId
  activeLabel: string
}>()

const emit = defineEmits<{ select: [id: EcosystemId] }>()
const open = ref(false)
</script>

<template>
  <div class="eco-selector" @click.stop="open = !open">
    <span class="eco-label">{{ activeLabel }}</span>
    <svg class="eco-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
      <polyline points="6 9 12 15 18 9" />
    </svg>
    <div v-if="open" class="eco-menu" @click.stop>
      <div
        v-for="eco in ECOSYSTEMS"
        :key="eco.id"
        class="eco-option"
        :class="{ active: eco.id === activeId, disabled: !eco.available }"
        @mousedown.prevent="eco.available && emit('select', eco.id); open = false"
      >
        <span>{{ eco.label }}</span>
        <span v-if="!eco.available" class="eco-soon">soon</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.eco-selector { display: flex; align-items: center; gap: 4px; padding: 0 10px 0 14px; cursor: pointer; flex-shrink: 0; position: relative; user-select: none; height: 100%; }
.eco-label { font-size: 13px; font-weight: 600; color: var(--text); white-space: nowrap; }
.eco-chevron { color: var(--text-dim); }
.eco-menu { position: absolute; top: calc(100% + 8px); left: 0; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-md); overflow: hidden; z-index: 300; min-width: 140px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4); }
.eco-option { padding: 8px 14px; font-size: 13px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: background 0.1s; color: var(--text); }
.eco-option:hover { background: var(--bg-input); }
.eco-option.active { color: var(--accent); font-weight: 600; }
.eco-option.disabled { color: var(--text-dim); cursor: default; }
.eco-option.disabled:hover { background: transparent; }
.eco-soon { font-size: 10px; color: var(--text-dim); font-style: italic; }
</style>

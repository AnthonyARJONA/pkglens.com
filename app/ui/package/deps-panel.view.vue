<script setup lang="ts">
import type { DepsPanelViewModel } from '~/presenters/deps-panel.presenter'

const props = defineProps<DepsPanelViewModel>()
const emit = defineEmits<{ navigate: [name: string] }>()

const showAll = ref(false)
const displayedDeps = computed(() => showAll.value ? props.allDeps : props.visibleDeps)
</script>

<template>
  <div>
    <div class="section-title">Dependency Tree · {{ totalCount }} packages</div>
    <div class="dep-tree mono">
      <div class="dep-row root-row">
        <span class="dep-link" @click="emit('navigate', packageName)">{{ packageName }}</span>
        <span class="dep-version">{{ packageVersion }}</span>
      </div>
      <div v-for="dep in displayedDeps" :key="dep.name" class="dep-row">
        <span class="dep-prefix">{{ dep.prefix }}</span>
        <span class="dep-link" @click="emit('navigate', dep.name)">{{ dep.name }}</span>
        <span class="dep-version">{{ dep.version }}</span>
        <span class="badge" :class="dep.badgeClass">{{ dep.badgeLabel }}</span>
      </div>
    </div>
    <button v-if="hiddenCount > 0" class="toggle-btn" @click="showAll = !showAll">
      {{ showAll ? 'Show first 10' : `Show all ${totalCount} dependencies` }}
    </button>
    <p v-if="!hasDeps" class="zero-deps">Zero dependencies</p>
  </div>
</template>

<style scoped>
.dep-tree { font-size: 13px; }
.dep-row { display: flex; align-items: center; padding: 5px 0; gap: var(--space-sm); }
.root-row { padding-bottom: 8px; }
.dep-prefix { color: var(--text-dim); white-space: pre; user-select: none; }
.dep-link { color: var(--accent); cursor: pointer; }
.dep-link:hover { text-decoration: underline; }
.dep-version { color: var(--text-dim); }
.zero-deps { color: var(--green); font-size: 13px; margin-top: 12px; }
.toggle-btn {
  margin-top: 12px; padding: 8px 16px; background: var(--bg-card);
  border: 1px solid var(--border); border-radius: var(--radius-md);
  color: var(--accent); font-size: 13px; cursor: pointer;
  font-family: inherit; transition: all 0.15s; width: 100%;
}
.toggle-btn:hover { border-color: var(--accent); background: var(--accent-bg); }
</style>

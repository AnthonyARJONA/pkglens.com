<script setup lang="ts">
import type { AlternativeViewModel } from '~/presenters/alternatives-panel.presenter'

defineProps<{
  packageName: string
  alternatives: AlternativeViewModel[]
  loading: boolean
}>()

const emit = defineEmits<{ navigate: [name: string] }>()
</script>

<template>
  <div>
    <div class="section-title">Alternatives to {{ packageName }}</div>
    <div v-if="loading" class="loading"><div class="spinner" /></div>
    <div v-else-if="alternatives.length > 0">
      <div v-for="alt in alternatives" :key="alt.name" class="alt-card" @click="emit('navigate', alt.name)">
        <div class="alt-name">{{ alt.name }}</div>
        <div class="alt-desc">{{ alt.description }}</div>
        <div class="alt-stats">
          <div class="alt-stat"><div class="alt-stat-label">Version</div><div class="alt-stat-val mono">{{ alt.version }}</div></div>
          <div class="alt-stat"><div class="alt-stat-label">Weekly DL</div><div class="alt-stat-val mono">{{ alt.weeklyDownloads }}</div></div>
          <div class="alt-stat"><div class="alt-stat-label">License</div><div class="alt-stat-val mono">{{ alt.license }}</div></div>
        </div>
      </div>
    </div>
    <p v-else class="no-data">No curated alternatives available for this package.</p>
  </div>
</template>

<style scoped>
.loading { display: flex; justify-content: center; padding: 40px; }
.spinner { width: 32px; height: 32px; border: 3px solid var(--border); border-top-color: var(--accent); border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.alt-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: var(--space-md) 20px; margin-bottom: 12px; cursor: pointer; transition: border-color 0.15s; }
.alt-card:hover { border-color: var(--accent); }
.alt-name { font-weight: 600; color: var(--accent); font-size: 15px; }
.alt-desc { font-size: 12px; color: var(--text-dim); margin-top: var(--space-xs); line-height: 1.4; }
.alt-stats { display: flex; gap: var(--space-md); font-size: 12px; color: var(--text-dim); margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--border); }
.alt-stat { display: flex; flex-direction: column; gap: 2px; }
.alt-stat-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
.alt-stat-val { font-weight: 600; color: var(--text); font-size: 12px; }
.no-data { color: var(--text-dim); font-size: 13px; }
</style>

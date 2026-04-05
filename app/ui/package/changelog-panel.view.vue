<script setup lang="ts">
import type { ChangelogEntryViewModel } from '~/presenters/changelog-panel.presenter'

const props = defineProps<{
  stable: ChangelogEntryViewModel[]
  majors: ChangelogEntryViewModel[]
  all: ChangelogEntryViewModel[]
}>()

const filter = ref<'stable' | 'majors' | 'all'>('stable')
const searchQuery = ref('')
const expanded = ref<Set<string>>(new Set())

const sourceEntries = computed(() => {
  if (filter.value === 'majors') return props.majors
  if (filter.value === 'all') return props.all
  return props.stable
})

const entries = computed(() => {
  const q = searchQuery.value.trim()
  if (!q) return sourceEntries.value
  return sourceEntries.value.filter((e) => e.version.includes(q))
})

function toggleExpand(version: string) {
  if (expanded.value.has(version)) expanded.value.delete(version)
  else expanded.value.add(version)
}
</script>

<template>
  <div>
    <div class="changelog-controls">
      <div class="filter-bar">
        <button :class="{ active: filter === 'stable' }" @click="filter = 'stable'">Stable</button>
        <button :class="{ active: filter === 'majors' }" @click="filter = 'majors'">Majors</button>
        <button :class="{ active: filter === 'all' }" @click="filter = 'all'">All</button>
      </div>
      <input v-model="searchQuery" class="version-search mono" type="text" placeholder="Filter by version…" autocomplete="off" spellcheck="false">
    </div>

    <div v-for="entry in entries" :key="entry.version" class="changelog-item">
      <div class="changelog-header">
        <span class="changelog-version mono">{{ entry.version }}</span>
        <span v-if="entry.tagLabel" class="changelog-tag" :class="entry.tagColorClass">{{ entry.tagLabel }}</span>
        <span class="changelog-date">{{ entry.date }}</span>
      </div>
      <div v-if="entry.releaseBodyHtml" class="changelog-body" :class="{ expanded: expanded.has(entry.version) }">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="entry.releaseBodyHtml" />
      </div>
      <button v-if="entry.releaseBodyHtml" class="toggle-btn" @click="toggleExpand(entry.version)">
        {{ expanded.has(entry.version) ? 'Show less' : 'Show more' }}
      </button>
    </div>

    <p v-if="entries.length === 0" class="no-data">
      {{ searchQuery ? 'No versions matching "' + searchQuery + '"' : 'No versions found.' }}
    </p>
  </div>
</template>

<style scoped>
.changelog-controls { display: flex; gap: 12px; margin-bottom: var(--space-md); align-items: center; }
.version-search { margin-left: auto; }
.filter-bar { display: flex; gap: 0; }
.filter-bar button {
  padding: 6px 14px; font-size: 12px; font-weight: 500;
  cursor: pointer; background: var(--bg-card); border: 1px solid var(--border);
  color: var(--text-dim); font-family: inherit; transition: all 0.15s;
}
.filter-bar button:first-child { border-radius: var(--radius-md) 0 0 var(--radius-md); }
.filter-bar button:last-child { border-radius: 0 var(--radius-md) var(--radius-md) 0; }
.filter-bar button:not(:first-child) { border-left: none; }
.filter-bar button.active { border-color: var(--accent); color: var(--accent); background: var(--accent-bg); z-index: 1; position: relative; }
.filter-bar button:hover { color: var(--accent); }

.version-search {
  flex: 1; max-width: 200px; padding: 6px 12px;
  background: var(--bg-input); border: 1px solid var(--border);
  border-radius: var(--radius-md); color: var(--text-bright);
  font-size: 12px; outline: none; transition: border-color 0.2s;
}
.version-search:focus { border-color: var(--accent); }
.version-search::placeholder { color: var(--text-dim); }

.changelog-item { padding: 16px 0; border-bottom: 1px solid var(--border); }
.changelog-item:last-child { border-bottom: none; }
.changelog-header { display: flex; align-items: center; gap: 10px; margin-bottom: var(--space-sm); flex-wrap: wrap; }
.changelog-version { font-weight: 600; color: var(--text-bright); font-size: 15px; }
.changelog-date { font-size: 12px; color: var(--text-dim); }
.changelog-tag { font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: var(--radius-sm); }
.tag-red { color: var(--red); background: var(--red-bg); }
.tag-cyan { color: var(--cyan); background: var(--cyan-bg); }
.tag-green { color: var(--green); background: var(--green-bg); }
.tag-accent { color: var(--accent); background: var(--accent-bg); }

.changelog-body {
  font-size: 13px; color: var(--text-dim); line-height: 1.7;
  max-height: 140px; overflow: hidden; position: relative;
}
.changelog-body.expanded { max-height: none; }
.changelog-body :deep(h3) { font-size: 14px; color: var(--text); margin: 12px 0 6px; font-weight: 600; }
.changelog-body :deep(h4) { font-size: 13px; color: var(--text); margin: 10px 0 4px; font-weight: 600; }
.changelog-body :deep(ul) { padding-left: 18px; margin: 4px 0; }
.changelog-body :deep(li) { margin-bottom: 3px; }
.changelog-body :deep(code) {
  font-family: var(--font-mono); font-size: 12px;
  background: var(--bg); padding: 1px 5px; border-radius: 3px;
}
.changelog-body :deep(strong) { color: var(--text); }
.changelog-body :deep(a) { color: var(--accent); }

.toggle-btn { font-size: 12px; color: var(--accent); cursor: pointer; margin-top: 6px; background: none; border: none; font-family: inherit; }
.toggle-btn:hover { text-decoration: underline; }
.no-data { color: var(--text-dim); font-size: 13px; }
</style>

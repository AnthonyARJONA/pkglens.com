<script setup lang="ts">
import type { SearchSuggestion } from '~/composables/use-search-suggestions'
import type { EcosystemId } from '~/core/ecosystem/ecosystem.types'

defineProps<{
  quickLinks: Array<{ name: string; ecosystem: EcosystemId }>
  searchResults: readonly SearchSuggestion[]
  activeEcosystem: EcosystemId
  scanLabel: string
}>()

const emit = defineEmits<{
  search: [name: string, ecosystem: EcosystemId, version?: string]
  input: [query: string, ecosystem: EcosystemId]
  ecosystemChange: [ecosystem: EcosystemId]
  scanFile: [content: string, filename: string]
}>()

const dragging = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

function handleDrop(e: DragEvent) {
  e.preventDefault()
  dragging.value = false
  const file = e.dataTransfer?.files[0]
  if (file) readFile(file)
}

function handleFileSelect(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) readFile(file)
}

function readFile(file: File) {
  const reader = new FileReader()
  reader.onload = () => {
    if (typeof reader.result === 'string') emit('scanFile', reader.result, file.name)
  }
  reader.readAsText(file)
}

function openFileDialog() {
  fileInput.value?.click()
}
</script>

<template>
  <div
    class="hero"
    :class="{ dragging }"
    @dragover.prevent="dragging = true"
    @dragleave="dragging = false"
    @drop="handleDrop"
  >
    <!-- Drop overlay -->
    <div v-if="dragging" class="drop-overlay">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
      </svg>
      <p>Drop to scan</p>
    </div>

    <div class="hero-logo">pkg<span>lens</span></div>
    <p class="hero-tagline">
      See inside any package.<br>
      Dependencies, vulnerabilities, license &amp; health — all in one view.
    </p>

    <SearchBarView
      variant="hero"
      :suggestions="searchResults"
      @search="(name, eco, ver) => emit('search', name, eco, ver)"
      @input="(q, eco) => emit('input', q, eco)"
      @ecosystem-change="(eco) => emit('ecosystemChange', eco)"
    />

    <div class="hero-or">or try</div>
    <div class="hero-suggestions">
      <button v-for="link in quickLinks" :key="link.name" @click="emit('search', link.name, link.ecosystem)">{{ link.name }}</button>
    </div>

    <button class="scan-link" @click="openFileDialog">{{ scanLabel }}</button>
    <input ref="fileInput" type="file" accept=".json,.txt,.toml" hidden @change="handleFileSelect">

    <section class="seo-content">
      <h2>Why pkglens?</h2>
      <div class="seo-grid">
        <div class="seo-card">
          <h3>Deep vulnerability scanning</h3>
          <p>Scan direct dependencies for known CVEs using the OSV database. See which dependencies put your project at risk.</p>
        </div>
        <div class="seo-card">
          <h3>Bundle analysis</h3>
          <p>Understand what you're paying for. See tree-shaking support, module composition, and loading impact on slow connections.</p>
        </div>
        <div class="seo-card">
          <h3>Maintenance health</h3>
          <p>Check release cadence, maintainer count, and community activity. Know if a package is actively maintained before you depend on it.</p>
        </div>
        <div class="seo-card">
          <h3>Curated alternatives</h3>
          <p>Compare with hand-picked alternatives. See how your chosen package stacks up in downloads, bundle size, and security.</p>
        </div>
      </div>
      <p class="seo-ecosystems">Supports <strong>npm</strong>, <strong>Composer</strong> and <strong>PyPI</strong> packages.</p>
    </section>
  </div>
</template>

<style scoped>
.hero {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  min-height: 100vh; gap: var(--space-lg); text-align: center; padding: 0 var(--space-lg);
  position: relative;
}
.hero.dragging { }
.hero-logo { font-size: 56px; font-weight: 800; color: var(--accent); letter-spacing: -2px; }
.hero-logo span { color: var(--text-dim); font-weight: 500; }
.hero-tagline { color: var(--text-dim); font-size: 18px; max-width: 460px; line-height: 1.6; }
.hero-or { font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--text-dim); margin-top: -4px; }
.hero-suggestions { display: flex; gap: var(--space-sm); flex-wrap: wrap; justify-content: center; }
.hero-suggestions button {
  padding: 7px 16px; background: var(--bg-card); border: 1px solid var(--border);
  border-radius: var(--radius-md); color: var(--text); font-size: 13px;
  cursor: pointer; font-family: var(--font-mono); transition: all 0.15s;
}
.hero-suggestions button:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-bg); }

.scan-link {
  font-size: 14px; color: var(--text-dim); margin-top: var(--space-sm);
  background: none; border: none; cursor: pointer; font-family: inherit;
  transition: color 0.15s;
}
.scan-link:hover { color: var(--accent); text-decoration: underline; }

.drop-overlay {
  position: absolute; inset: 0; z-index: 50;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;
  background: rgba(26, 27, 38, 0.92); border: 2px dashed var(--accent);
  border-radius: var(--radius-lg); color: var(--accent);
}
.drop-overlay p { font-size: 18px; font-weight: 600; }

.seo-content {
  max-width: 700px; text-align: center; margin-top: var(--space-xl);
  padding-top: var(--space-xl); border-top: 1px solid var(--border);
}
.seo-content h2 { font-size: 20px; font-weight: 700; color: var(--text-bright); margin-bottom: var(--space-lg); }
.seo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); text-align: left; margin-bottom: var(--space-lg); }
.seo-card { padding: 16px; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); }
.seo-card h3 { font-size: 14px; font-weight: 600; color: var(--text); margin-bottom: 6px; }
.seo-card p { font-size: 13px; color: var(--text-dim); line-height: 1.5; }
.seo-ecosystems { font-size: 13px; color: var(--text-dim); }
.seo-ecosystems strong { color: var(--text); }

@media (max-width: 768px) {
  .hero-logo { font-size: 40px; }
  .seo-grid { grid-template-columns: 1fr; }
}
</style>

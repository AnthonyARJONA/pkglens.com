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
  search: [name: string, ecosystem: EcosystemId]
  input: [query: string, ecosystem: EcosystemId]
  ecosystemChange: [ecosystem: EcosystemId]
}>()
</script>

<template>
  <div class="hero">
    <div class="hero-logo">pkg<span>lens</span></div>
    <p class="hero-tagline">
      See inside any package.<br>
      Dependencies, vulnerabilities, license &amp; health — all in one view.
    </p>

    <SearchBarView
      variant="hero"
      :suggestions="searchResults"
      @search="(name, eco) => emit('search', name, eco)"
      @input="(q, eco) => emit('input', q, eco)"
    />

    <div class="hero-or">or try</div>
    <div class="hero-suggestions">
      <button v-for="link in quickLinks" :key="link.name" @click="emit('search', link.name, link.ecosystem)">{{ link.name }}</button>
    </div>
    <NuxtLink to="/scan" class="scan-link">{{ scanLabel }}</NuxtLink>
  </div>
</template>

<style scoped>
.hero {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  min-height: 100vh; gap: var(--space-lg); text-align: center; padding: 0 var(--space-lg);
}
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
.scan-link { font-size: 14px; color: var(--text-dim); margin-top: var(--space-sm); transition: color 0.15s; }
.scan-link:hover { color: var(--accent); text-decoration: underline; }
@media (max-width: 768px) { .hero-logo { font-size: 40px; } }
</style>

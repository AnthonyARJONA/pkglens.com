<script setup lang="ts">
import type { DepsVulnBannerViewModel } from '~/presenters/deps-vuln-banner.presenter'

defineProps<DepsVulnBannerViewModel>()
const emit = defineEmits<{ navigate: [name: string] }>()
</script>

<template>
  <div class="banner">
    <div class="banner-header">
      <svg class="banner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
      <span class="banner-title">
        {{ totalVulns }} vulnerabilit{{ totalVulns > 1 ? 'ies' : 'y' }} found in {{ affectedDeps }} of {{ totalDeps }} dependencies
      </span>
    </div>
    <div class="banner-items">
      <div v-for="item in items" :key="item.name" class="banner-item">
        <span class="sev-dot" :class="item.severity" />
        <span class="dep-name" @click="emit('navigate', item.name)">{{ item.name }}</span>
        <span class="vuln-count">{{ item.vulnCount }} vuln{{ item.vulnCount > 1 ? 's' : '' }}</span>
        <span class="cve mono">{{ item.topCve }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.banner {
  padding: 14px var(--space-md); border-radius: var(--radius-lg);
  background: var(--red-bg); border: 1px solid rgba(247, 118, 142, 0.25);
  margin-bottom: var(--space-lg);
}
.banner-header { display: flex; align-items: center; gap: var(--space-sm); margin-bottom: 10px; }
.banner-icon { color: var(--red); flex-shrink: 0; }
.banner-title { font-size: 14px; font-weight: 600; color: var(--red); }
.banner-items { display: flex; flex-direction: column; gap: 6px; }
.banner-item { display: flex; align-items: center; gap: var(--space-sm); font-size: 13px; }
.sev-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.sev-dot.critical { background: var(--red); }
.sev-dot.high { background: #e06040; }
.sev-dot.medium { background: var(--orange); }
.sev-dot.low { background: var(--green); }
.dep-name { color: var(--accent); cursor: pointer; font-weight: 500; }
.dep-name:hover { text-decoration: underline; }
.vuln-count { color: var(--text-dim); }
.cve { color: var(--text-dim); font-size: 11px; margin-left: auto; }
</style>

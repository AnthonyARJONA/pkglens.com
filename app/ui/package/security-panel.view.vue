<script setup lang="ts">
import type { SecurityPanelViewModel } from '~/presenters/security-panel.presenter'

defineProps<SecurityPanelViewModel>()
</script>

<template>
  <div>
    <div v-if="!hasVulns" class="all-clear">
      <div class="shield-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
        </svg>
      </div>
      <h3>All clear</h3>
      <p>No known vulnerabilities found for {{ packageLabel }}</p>
      <p class="source">Data source: OSV.dev (Google Open Source Vulnerabilities)</p>
    </div>

    <div v-else>
      <div class="section-title">{{ summaryText }}</div>

      <div v-for="v in vulns" :key="v.id" class="vuln-item">
        <div class="vuln-header">
          <span class="vuln-severity" :class="v.severity">{{ v.severity }}</span>
          <span class="vuln-id mono">{{ v.cve }}</span>
        </div>
        <div class="vuln-desc">{{ v.description }}</div>
        <div class="vuln-meta">
          <div v-if="v.ghsa" class="vuln-meta-item"><strong>GHSA:</strong> {{ v.ghsa }}</div>
          <div v-if="v.publishedDate" class="vuln-meta-item"><strong>Published:</strong> {{ v.publishedDate }}</div>
          <div v-if="v.cweIds" class="vuln-meta-item"><strong>CWE:</strong> {{ v.cweIds }}</div>
        </div>
        <div v-if="v.fixedVersion" class="vuln-fix">&#10003; Fixed in version <strong>{{ v.fixedVersion }}</strong></div>
      </div>

      <p class="source">Data source: OSV.dev (Google Open Source Vulnerabilities)</p>
    </div>
  </div>
</template>

<style scoped>
.all-clear { display: flex; flex-direction: column; align-items: center; padding: var(--space-xl) var(--space-lg); text-align: center; gap: 12px; }
.shield-icon { width: 64px; height: 64px; border-radius: 50%; background: var(--green-bg); border: 2px solid rgba(154, 206, 106, 0.3); display: flex; align-items: center; justify-content: center; color: var(--green); }
.all-clear h3 { color: var(--green); font-size: 18px; }
.all-clear p { color: var(--text-dim); font-size: 13px; }
.vuln-item { margin-bottom: var(--space-md); padding: var(--space-md); border-radius: var(--radius-lg); background: var(--bg-card); border: 1px solid var(--border); }
.vuln-header { display: flex; align-items: center; gap: var(--space-sm); margin-bottom: var(--space-sm); }
.vuln-severity { font-size: 10px; font-weight: 700; text-transform: uppercase; padding: 2px 8px; border-radius: var(--radius-sm); }
.vuln-severity.critical { color: #fff; background: var(--red); }
.vuln-severity.high { color: #fff; background: #e06040; }
.vuln-severity.medium { color: var(--bg); background: var(--orange); }
.vuln-severity.low { color: var(--bg); background: var(--green); }
.vuln-id { font-size: 13px; font-weight: 600; color: var(--text-bright); }
.vuln-desc { font-size: 13px; color: var(--text-dim); line-height: 1.5; }
.vuln-meta { margin-top: 10px; display: flex; gap: var(--space-md); flex-wrap: wrap; font-size: 12px; }
.vuln-meta-item { display: flex; align-items: center; gap: 4px; color: var(--text-dim); }
.vuln-meta-item strong { color: var(--text); font-weight: 600; }
.vuln-fix { margin-top: 10px; padding: var(--space-sm) 12px; border-radius: 6px; background: var(--green-bg); border: 1px solid rgba(154, 206, 106, 0.2); font-size: 12px; color: var(--green); }
.source { font-size: 12px; color: var(--text-dim); margin-top: var(--space-md); }
</style>

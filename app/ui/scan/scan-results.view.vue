<script setup lang="ts">
import type { ScanResultViewModel } from '~/presenters/scan.presenter'

defineProps<ScanResultViewModel>()
const emit = defineEmits<{ navigate: [name: string, version?: string] }>()
</script>

<template>
  <div>
    <!-- Summary -->
    <div class="scan-summary">
      <div class="summary-stat">
        <div class="summary-value">{{ totalPackages }}</div>
        <div class="summary-label">packages scanned</div>
      </div>
      <div class="summary-stat">
        <div class="summary-value" :class="totalVulns > 0 ? 'text-red' : 'text-green'">{{ totalVulns }}</div>
        <div class="summary-label">vulnerabilities</div>
      </div>
      <div class="summary-stat">
        <div class="summary-value" :class="affectedPackages > 0 ? 'text-orange' : 'text-green'">{{ affectedPackages }}</div>
        <div class="summary-label">affected</div>
      </div>
      <div class="summary-stat">
        <div class="summary-value text-green">{{ cleanPackages }}</div>
        <div class="summary-label">clean</div>
      </div>
    </div>

    <!-- Dependencies with vulns -->
    <div v-if="deps.length > 0" class="scan-section">
      <div class="section-title">{{ depsLabel }}</div>
      <table class="scan-table">
        <thead>
          <tr><th>Package</th><th>Version</th><th>Vulns</th><th>Severity</th><th>CVE</th></tr>
        </thead>
        <tbody>
          <tr v-for="d in deps" :key="d.name">
            <td class="pkg-cell" @click="emit('navigate', d.name, d.version)">{{ d.name }}</td>
            <td class="mono">{{ d.version }}</td>
            <td><span class="vuln-badge">{{ d.vulnCount }}</span></td>
            <td><span class="sev" :class="d.topSeverity">{{ d.topSeverity }}</span></td>
            <td class="mono cve-cell">{{ d.topCve }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="devDeps.length > 0" class="scan-section">
      <div class="section-title">{{ devDepsLabel }}</div>
      <table class="scan-table">
        <thead>
          <tr><th>Package</th><th>Version</th><th>Vulns</th><th>Severity</th><th>CVE</th></tr>
        </thead>
        <tbody>
          <tr v-for="d in devDeps" :key="d.name">
            <td class="pkg-cell" @click="emit('navigate', d.name, d.version)">{{ d.name }}</td>
            <td class="mono">{{ d.version }}</td>
            <td><span class="vuln-badge">{{ d.vulnCount }}</span></td>
            <td><span class="sev" :class="d.topSeverity">{{ d.topSeverity }}</span></td>
            <td class="mono cve-cell">{{ d.topCve }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="deps.length === 0 && devDeps.length === 0" class="all-clear">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
      </svg>
      <h3>All clear</h3>
      <p>No known vulnerabilities found in any of your {{ totalPackages }} dependencies.</p>
    </div>
  </div>
</template>

<style scoped>
.scan-summary {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px;
  background: var(--border); border-radius: var(--radius-lg); overflow: hidden; margin-bottom: var(--space-lg);
}
.summary-stat { background: var(--bg-card); padding: 20px; text-align: center; }
.summary-value { font-size: 32px; font-weight: 700; color: var(--text-bright); }
.summary-label { font-size: 12px; color: var(--text-dim); margin-top: 4px; }
.text-red { color: var(--red); }
.text-orange { color: var(--orange); }
.text-green { color: var(--green); }

.scan-section { margin-bottom: var(--space-lg); }
.scan-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.scan-table th {
  text-align: left; padding: 8px 12px; font-size: 11px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-dim);
  border-bottom: 1px solid var(--border);
}
.scan-table td { padding: 10px 12px; border-bottom: 1px solid var(--border); }
.pkg-cell { color: var(--accent); cursor: pointer; font-weight: 500; }
.pkg-cell:hover { text-decoration: underline; }
.vuln-badge { color: var(--red); font-weight: 600; }
.sev { font-size: 10px; font-weight: 700; text-transform: uppercase; padding: 2px 6px; border-radius: var(--radius-sm); }
.sev.critical { color: #fff; background: var(--red); }
.sev.high { color: #fff; background: #e06040; }
.sev.medium { color: var(--bg); background: var(--orange); }
.sev.low { color: var(--bg); background: var(--green); }
.cve-cell { color: var(--text-dim); font-size: 11px; }

.all-clear { display: flex; flex-direction: column; align-items: center; padding: var(--space-xl); text-align: center; gap: 12px; color: var(--green); }
.all-clear h3 { font-size: 18px; }
.all-clear p { color: var(--text-dim); font-size: 13px; }

@media (max-width: 768px) { .scan-summary { grid-template-columns: repeat(2, 1fr); } }
</style>

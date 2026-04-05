<script setup lang="ts">
import { presentScanResult } from '~/presenters/scan.presenter'

const router = useRouter()
const { result, loading, error, scanPackageJson, reset } = useScanFlow()

const scanVM = computed(() => result.value ? presentScanResult(result.value) : null)

function goToPackage(name: string) {
  router.push(`/package/${encodeURIComponent(name)}`)
}

useHead({ title: 'Scan package.json — pkglens' })
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <NuxtLink to="/" class="logo">pkg<span>lens</span></NuxtLink>
      <h2 class="page-title">Scan package.json</h2>
    </div>
  </header>

  <div class="container">
    <ScanUploadView v-if="!scanVM" :loading="loading" :error="error" @scan="scanPackageJson" />
    <template v-else>
      <button class="reset-btn" @click="reset()">Scan another file</button>
      <ScanResultsView v-bind="scanVM" @navigate="goToPackage" />
    </template>
  </div>
</template>

<style scoped>
.header {
  padding: 12px var(--space-lg); background: var(--bg-header);
  border-bottom: 1px solid var(--border);
}
.header-inner { max-width: 960px; margin: 0 auto; display: flex; align-items: center; gap: var(--space-lg); }
.logo { font-weight: 800; font-size: 20px; color: var(--accent); letter-spacing: -0.5px; text-decoration: none; }
.logo span { color: var(--text-dim); font-weight: 500; }
.page-title { font-size: 16px; font-weight: 500; color: var(--text-dim); }
.container { max-width: 960px; margin: 0 auto; padding: var(--space-lg); }
.reset-btn {
  margin-bottom: var(--space-md); padding: 6px 16px;
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: var(--radius-md); color: var(--text-dim); font-size: 13px;
  cursor: pointer; font-family: inherit;
}
.reset-btn:hover { border-color: var(--accent); color: var(--accent); }
</style>

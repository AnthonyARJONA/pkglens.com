<script setup lang="ts">
import type { EcosystemId } from '~/core/ecosystem/ecosystem.types'
import { presentScanResult } from '~/presenters/scan.presenter'

const router = useRouter()
const { result, loading, error } = useScanFlow()
const { suggestions, search: searchSuggestions } = useSearchSuggestions()

const scanVM = computed(() => result.value ? presentScanResult(result.value) : null)
const scanEco = computed(() => (result.value?.ecosystem as EcosystemId) || 'npm')

watch([result, loading, error], () => {
  if (!result.value && !loading.value && !error.value) {
    router.replace('/')
  }
}, { immediate: true })

function goToPackage(name: string, versionOrEco?: string) {
  const effectiveEco = result.value?.ecosystem || 'npm'
  const query: Record<string, string> = {}
  if (effectiveEco && effectiveEco !== 'npm') query.eco = effectiveEco
  if (versionOrEco && !['npm', 'packagist', 'pypi', 'cargo', 'go'].includes(versionOrEco)) {
    query.version = versionOrEco
  }
  router.push({ path: `/package/${encodeURIComponent(name)}`, query })
}

useHead({
  title: 'Scan package.json or composer.json — pkglens',
  meta: [
    { name: 'description', content: 'Upload your package.json or composer.json and scan all dependencies for known vulnerabilities in seconds.' },
    { property: 'og:title', content: 'Scan dependencies — pkglens' },
    { property: 'og:description', content: 'Upload your package.json or composer.json and scan all dependencies for known vulnerabilities.' },
  ],
})
</script>

<template>
  <div v-if="scanVM || loading || error">
    <header class="header">
      <div class="header-inner">
        <NuxtLink to="/" class="logo">pkg<span>lens</span></NuxtLink>
        <SearchBarView
          variant="header"
          :suggestions="suggestions"
          :initial-ecosystem="scanEco"
          @search="(name, eco) => goToPackage(name, eco)"
          @input="(q, eco) => searchSuggestions(q, eco)"
        />
      </div>
    </header>

    <div class="container">
      <div v-if="loading" class="scan-loading">
        <div class="spinner" />
        <p>Scanning dependencies…</p>
      </div>
      <p v-else-if="error" class="scan-error">{{ error }}</p>
      <ScanResultsView v-else-if="scanVM" v-bind="scanVM" @navigate="goToPackage" />
    </div>
  </div>
</template>

<style scoped>
.header { padding: 12px var(--space-lg); background: var(--bg-header); border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100; }
.header-inner { max-width: 960px; margin: 0 auto; display: flex; align-items: center; gap: var(--space-lg); }
.logo { font-weight: 800; font-size: 20px; color: var(--accent); letter-spacing: -0.5px; text-decoration: none; flex-shrink: 0; }
.logo span { color: var(--text-dim); font-weight: 500; }
.container { max-width: 960px; margin: 0 auto; padding: var(--space-lg); }
.scan-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 40vh; gap: 16px; }
.spinner { width: 40px; height: 40px; border: 3px solid var(--border); border-top-color: var(--accent); border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.scan-loading p { color: var(--text-dim); font-size: 14px; }
.scan-error { color: var(--red); font-size: 14px; text-align: center; padding: var(--space-xl); }
</style>

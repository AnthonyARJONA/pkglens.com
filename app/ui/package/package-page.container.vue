<script setup lang="ts">
import type { TabId } from '~/core/package/package.types'
import type { EcosystemId } from '~/core/ecosystem/ecosystem.types'
import { COPY_FEEDBACK_MS } from '~/core/constants'
import { presentPackageHeader } from '~/presenters/package-header.presenter'
import { presentDepsPanel } from '~/presenters/deps-panel.presenter'
import { presentBundlePanel } from '~/presenters/bundle-panel.presenter'
import { presentSecurityPanel } from '~/presenters/security-panel.presenter'
import { presentChangelogPanel } from '~/presenters/changelog-panel.presenter'
import { presentAlternatives } from '~/presenters/alternatives-panel.presenter'

const route = useRoute()
const router = useRouter()
const { data, loading, error, fetchPackage } = usePackageFlow()
const { alternatives, loading: altsLoading, fetchAlternatives } = useAlternativesFlow()
const { suggestions, search: searchSuggestions } = useSearchSuggestions()

const activeTab = ref<TabId>('deps')
const installCopied = ref(false)
const packageName = computed(() => decodeURIComponent(route.params.name as string))
const ecosystem = computed(() => (route.query.eco as EcosystemId) || 'npm' as EcosystemId)
const requestedVersion = computed(() => (route.query.version as string) || undefined)

const headerVM = computed(() => data.value ? presentPackageHeader(data.value) : null)
const depsVM = computed(() => data.value ? presentDepsPanel(data.value) : null)
const bundleVM = computed(() => data.value ? presentBundlePanel(data.value) : null)
const securityVM = computed(() => data.value ? presentSecurityPanel(data.value) : null)
const changelogVM = computed(() => data.value ? presentChangelogPanel(data.value) : null)
const alternativesVM = computed(() => presentAlternatives(alternatives.value))

watch([() => route.params.name, () => route.query.eco, () => route.query.version], () => {
  activeTab.value = 'deps'
  fetchPackage(packageName.value, ecosystem.value, requestedVersion.value)
}, { immediate: true })
watch(data, (pkg) => { if (pkg) fetchAlternatives(pkg.registry.name, ecosystem.value) })

function goToPackage(name: string, eco?: string, version?: string) {
  const effectiveEco = eco || ecosystem.value
  const query: Record<string, string> = {}
  if (effectiveEco && effectiveEco !== 'npm') query.eco = effectiveEco
  if (version) query.version = version
  router.push({ path: `/package/${encodeURIComponent(name)}`, query })
}

async function copyInstall() {
  if (!headerVM.value) return
  await navigator.clipboard.writeText(headerVM.value.sidebar.installCommand)
  installCopied.value = true
  window.setTimeout(() => { installCopied.value = false }, COPY_FEEDBACK_MS)
}

useHead({
  title: computed(() => data.value ? `${data.value.registry.name} — pkglens` : 'Loading… — pkglens'),
  meta: computed(() => {
    if (!data.value) return []
    const d = data.value
    const desc = `${d.registry.name}: ${d.registry.description?.slice(0, 140) || 'Package analysis'}. Bundle size, dependencies, vulnerabilities, license & health.`
    return [
      { name: 'description', content: desc },
      { property: 'og:title', content: `${d.registry.name} — pkglens` },
      { property: 'og:description', content: desc },
      { property: 'og:url', content: `https://pkglens.com/package/${encodeURIComponent(d.registry.name)}` },
      { property: 'og:image', content: `https://pkglens.com/api/badge/${encodeURIComponent(d.registry.name)}` },
      { name: 'twitter:title', content: `${d.registry.name} — pkglens` },
      { name: 'twitter:description', content: desc },
    ]
  }),
  link: computed(() => {
    if (!data.value) return []
    return [{ rel: 'canonical', href: `https://pkglens.com/package/${encodeURIComponent(data.value.registry.name)}` }]
  }),
})
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <NuxtLink to="/" class="logo">pkg<span>lens</span></NuxtLink>
      <SearchBarView variant="header" :suggestions="suggestions" :initial-ecosystem="ecosystem" @search="(name, eco, ver) => goToPackage(name, eco, ver)" @input="(q, eco) => searchSuggestions(q, eco)" />
    </div>
  </header>

  <PackageSkeletonView v-if="loading" :package-name="packageName" />

  <div v-else-if="error" class="error-screen">
    <h2>Package not found</h2>
    <p>{{ error }}</p>
  </div>

  <div v-else-if="headerVM" class="page-layout">
    <main class="main-col">
      <StaleBannerView v-if="data!.meta.stale" />

      <div class="pkg-top">
        <div class="pkg-icon">{{ headerVM.abbr }}</div>
        <div class="pkg-info">
          <h1 class="pkg-name">{{ headerVM.name }}</h1>
          <p class="pkg-desc">{{ headerVM.description }}</p>
          <p class="pkg-meta">{{ headerVM.metadataLine }}</p>
        </div>
      </div>

      <DepsVulnBannerView v-if="headerVM.depsVulnBanner" v-bind="headerVM.depsVulnBanner" @navigate="goToPackage" />

      <div class="stats-bar">
        <div v-for="stat in headerVM.stats" :key="stat.label" class="stat-item">
          <div class="stat-label">{{ stat.label }}</div>
          <div class="stat-value" :style="stat.valueColor ? { color: stat.valueColor } : {}">{{ stat.value }}</div>
          <div class="stat-sub">{{ stat.sub }}</div>
        </div>
      </div>

      <div class="tabs">
        <button class="tab" :class="{ active: activeTab === 'deps' }" @click="activeTab = 'deps'">Dependencies</button>
        <button v-if="headerVM.hasBundle" class="tab" :class="{ active: activeTab === 'bundle' }" @click="activeTab = 'bundle'">Bundle</button>
        <button v-if="headerVM.vulnCount > 0" class="tab" :class="{ active: activeTab === 'security' }" @click="activeTab = 'security'">
          Security <span class="tab-badge tab-badge-red">{{ headerVM.vulnCount }}</span>
        </button>
        <button class="tab" :class="{ active: activeTab === 'changelog' }" @click="activeTab = 'changelog'">Changelog</button>
        <button class="tab" :class="{ active: activeTab === 'alternatives' }" @click="activeTab = 'alternatives'">Alternatives</button>
      </div>

      <DepsPanelView v-if="activeTab === 'deps' && depsVM" v-bind="depsVM" @navigate="(name, ver) => goToPackage(name, undefined, ver)" />
      <BundlePanelView v-if="activeTab === 'bundle' && bundleVM" v-bind="bundleVM" />
      <SecurityPanelView v-if="activeTab === 'security' && securityVM" v-bind="securityVM" />
      <ChangelogPanelView v-if="activeTab === 'changelog' && changelogVM" v-bind="changelogVM" />
      <AlternativesPanelView v-if="activeTab === 'alternatives'" :package-name="headerVM.name" :alternatives="alternativesVM" :loading="altsLoading" @navigate="goToPackage" />
    </main>

    <PackageSidebarView v-bind="headerVM.sidebar" :install-copied="installCopied" @copy="copyInstall" />
  </div>
</template>

<style scoped>
.header { padding: 12px var(--space-lg); background: var(--bg-header); border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100; }
.header-inner { max-width: 1080px; margin: 0 auto; display: flex; align-items: center; gap: var(--space-lg); }
.logo { font-weight: 800; font-size: 20px; color: var(--accent); letter-spacing: -0.5px; text-decoration: none; flex-shrink: 0; }
.logo span { color: var(--text-dim); font-weight: 500; }
.error-screen { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 40vh; gap: 12px; text-align: center; }
.error-screen h2 { color: var(--red); font-size: 20px; }
.error-screen p { color: var(--text-dim); font-size: 14px; }
.page-layout { max-width: 1080px; margin: 0 auto; padding: var(--space-lg); display: grid; grid-template-columns: 1fr 280px; gap: 40px; }
.main-col { min-width: 0; }
.pkg-top { display: flex; gap: var(--space-md); margin-bottom: var(--space-lg); }
.pkg-icon { width: 48px; height: 48px; border-radius: var(--radius-lg); background: var(--bg-card); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; color: var(--accent); flex-shrink: 0; }
.pkg-info { flex: 1; min-width: 0; }
.pkg-name { font-size: 22px; font-weight: 700; color: var(--text-bright); margin: 0 0 4px; }
.pkg-desc { font-size: 14px; color: var(--text-dim); line-height: 1.5; margin: 0 0 8px; }
.pkg-meta { font-size: 13px; color: var(--text-dim); margin: 0; }
@media (max-width: 820px) { .page-layout { grid-template-columns: 1fr; } }
</style>

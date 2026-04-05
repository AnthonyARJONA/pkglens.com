<script setup lang="ts">
import type { TabId } from '~/core/package/package.types'
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
const packageName = computed(() => decodeURIComponent(route.params.name as string))
const installCopied = ref(false)

const headerVM = computed(() => data.value ? presentPackageHeader(data.value) : null)
const depsVM = computed(() => data.value ? presentDepsPanel(data.value) : null)
const bundleVM = computed(() => data.value ? presentBundlePanel(data.value) : null)
const securityVM = computed(() => data.value ? presentSecurityPanel(data.value) : null)
const changelogVM = computed(() => data.value ? presentChangelogPanel(data.value) : null)
const alternativesVM = computed(() => presentAlternatives(alternatives.value))

watch(() => route.params.name, () => {
  activeTab.value = 'deps'
  fetchPackage(packageName.value)
}, { immediate: true })

watch(data, (pkg) => {
  if (pkg?.alternatives?.length) fetchAlternatives(pkg.alternatives)
})

function goToPackage(name: string) {
  router.push(`/package/${encodeURIComponent(name)}`)
}

async function copyInstall() {
  if (!headerVM.value) return
  await navigator.clipboard.writeText(headerVM.value.sidebar.installCommand)
  installCopied.value = true
  window.setTimeout(() => { installCopied.value = false }, 1500)
}

useHead({ title: computed(() => data.value ? `${data.value.registry.name} — pkglens` : 'Loading… — pkglens') })
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <NuxtLink to="/" class="logo">pkg<span>lens</span></NuxtLink>
      <SearchBarView
        variant="header"
        :suggestions="suggestions"
        @search="(name) => goToPackage(name)"
        @input="(q) => searchSuggestions(q)"
      />
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

      <!-- Package header -->
      <div class="pkg-top">
        <div class="pkg-icon">{{ headerVM.abbr }}</div>
        <div class="pkg-info">
          <h1 class="pkg-name">{{ headerVM.name }}</h1>
          <p class="pkg-desc">{{ headerVM.description }}</p>
          <p class="pkg-meta">{{ headerVM.metadataLine }}</p>
        </div>
      </div>

      <!-- Deep scan banner -->
      <DepsVulnBannerView v-if="headerVM.depsVulnBanner" v-bind="headerVM.depsVulnBanner" @navigate="goToPackage" />

      <!-- Stats bar -->
      <div class="stats-bar">
        <div v-for="stat in headerVM.stats" :key="stat.label" class="stat-item">
          <div class="stat-label">{{ stat.label }}</div>
          <div class="stat-value" :style="stat.valueColor ? { color: stat.valueColor } : {}">{{ stat.value }}</div>
          <div class="stat-sub">{{ stat.sub }}</div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="tabs">
        <button class="tab" :class="{ active: activeTab === 'deps' }" @click="activeTab = 'deps'">Dependencies</button>
        <button class="tab" :class="{ active: activeTab === 'bundle' }" @click="activeTab = 'bundle'">Bundle</button>
        <button v-if="headerVM.vulnCount > 0" class="tab" :class="{ active: activeTab === 'security' }" @click="activeTab = 'security'">
          Security
          <span class="tab-badge tab-badge-red">{{ headerVM.vulnCount }}</span>
        </button>
        <button class="tab" :class="{ active: activeTab === 'changelog' }" @click="activeTab = 'changelog'">Changelog</button>
        <button class="tab" :class="{ active: activeTab === 'alternatives' }" @click="activeTab = 'alternatives'">Alternatives</button>
      </div>

      <DepsPanelView v-if="activeTab === 'deps' && depsVM" v-bind="depsVM" @navigate="goToPackage" />
      <BundlePanelView v-if="activeTab === 'bundle' && bundleVM" v-bind="bundleVM" />
      <SecurityPanelView v-if="activeTab === 'security' && securityVM" v-bind="securityVM" />
      <ChangelogPanelView v-if="activeTab === 'changelog' && changelogVM" v-bind="changelogVM" />
      <AlternativesPanelView v-if="activeTab === 'alternatives'" :package-name="headerVM.name" :alternatives="alternativesVM" :loading="altsLoading" @navigate="goToPackage" />
    </main>

    <!-- Sidebar -->
    <aside class="sidebar">
      <!-- pkglens score -->
      <div class="sidebar-section">
        <div class="overall-card">
          <span class="overall-brand">pkg<span>lens</span></span>
          <span class="overall-score">{{ headerVM.sidebar.overallScore }}<span class="overall-max">/100</span></span>
        </div>
        <div class="scores-row">
          <ScoreCircleView v-for="s in headerVM.sidebar.scores" :key="s.label" v-bind="s" />
        </div>
      </div>

      <!-- Maintainers -->
      <div class="sidebar-section">
        <div class="maintainer-line">
          <span class="sidebar-title" style="margin-bottom: 0">Maintainers</span>
          <span class="maintainer-count" :class="headerVM.sidebar.maintainerCount === 1 ? 'risk-high' : headerVM.sidebar.maintainerCount === 2 ? 'risk-medium' : ''">{{ headerVM.sidebar.maintainerCount }}</span>
        </div>
      </div>

      <!-- Install -->
      <div class="sidebar-section">
        <button class="install-btn mono" @click="copyInstall">
          <span>{{ headerVM.sidebar.installCommand }}</span>
          <svg v-if="!installCopied" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
            <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="var(--green)" stroke-width="2.5" width="14" height="14">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </button>
      </div>

      <!-- Explore links -->
      <div class="sidebar-section">
        <div class="sidebar-title">Explore on</div>
        <div class="explore-links">
          <a v-for="link in headerVM.sidebar.quickLinks" :key="link.label" :href="link.href" target="_blank" rel="noopener" class="explore-link">
            <span class="explore-label">{{ link.description }}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
          </a>
        </div>
      </div>

      <!-- License -->
      <div class="sidebar-section">
        <div class="sidebar-title">License</div>
        <div class="sidebar-license">{{ headerVM.sidebar.license }}</div>
        <div class="license-perms">
          <div v-for="([type, label], i) in headerVM.sidebar.licensePermissions" :key="i" class="license-perm">
            <span :class="type">{{ type === 'check' ? '✓' : '✗' }}</span> {{ label }}
          </div>
        </div>
      </div>

      <!-- Recent versions -->
      <div v-if="headerVM.sidebar.recentVersions.length > 0" class="sidebar-section">
        <div class="sidebar-title">Recent Versions</div>
        <div class="recent-versions">
          <div v-for="v in headerVM.sidebar.recentVersions" :key="v.version" class="recent-version">
            <span class="rv-version mono">{{ v.version }}</span>
            <span class="rv-date">{{ v.date }}</span>
          </div>
        </div>
      </div>
    </aside>
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

/* Sidebar */
.sidebar { padding-top: 8px; }
.sidebar-section { padding: 14px 0; border-bottom: 1px solid var(--border); }
.sidebar-section:first-child { padding-top: 0; }
.sidebar-section:last-child { border-bottom: none; }
.sidebar-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--text-dim); margin-bottom: 8px; }
.scores-row { display: flex; gap: 16px; justify-content: center; margin-bottom: 10px; }

.overall-card {
  display: flex; align-items: baseline; justify-content: space-between;
  padding: 10px 14px; margin-bottom: 20px;
  background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-md);
}
.overall-brand { font-size: 13px; font-weight: 700; color: var(--accent); }
.overall-brand span { color: var(--text-dim); font-weight: 500; }
.overall-score { font-size: 16px; font-weight: 800; color: var(--text-bright); }
.overall-max { font-size: 16px; color: var(--text-dim); font-weight: 500; }

.maintainer-line { display: flex; align-items: center; justify-content: space-between; }
.maintainer-count { font-size: 15px; font-weight: 700; color: var(--text-bright); }
.maintainer-count.risk-high { color: var(--red); }
.maintainer-count.risk-medium { color: var(--orange); }


.install-btn { display: flex; align-items: center; justify-content: center; gap: 6px; width: 100%; padding: 8px 12px; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-md); color: var(--text-dim); font-size: 12px; cursor: pointer; transition: all 0.15s; }
.install-btn:hover { border-color: var(--accent); color: var(--accent); }

.explore-links { display: flex; flex-direction: column; gap: 6px; }
.explore-link {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 12px; background: var(--bg-card); border: 1px solid var(--border);
  border-radius: var(--radius-md); color: var(--text); font-size: 12px;
  text-decoration: none; transition: all 0.15s;
}
.explore-link:hover { border-color: var(--accent); color: var(--accent); text-decoration: none; }
.explore-link svg { color: var(--text-dim); flex-shrink: 0; }
.explore-link:hover svg { color: var(--accent); }

.sidebar-license { font-size: 18px; font-weight: 700; color: var(--accent); margin-bottom: 8px; }
.license-perms { display: flex; flex-direction: column; gap: 3px; }
.license-perm { font-size: 12px; display: flex; align-items: center; gap: 6px; }
.license-perm .check { color: var(--green); }
.license-perm .cross { color: var(--red); }

.recent-versions { display: flex; flex-direction: column; gap: 4px; }
.recent-version { display: flex; justify-content: space-between; font-size: 12px; }
.rv-version { color: var(--text); font-weight: 500; }
.rv-date { color: var(--text-dim); }

@media (max-width: 820px) { .page-layout { grid-template-columns: 1fr; } .sidebar { order: -1; } }
</style>

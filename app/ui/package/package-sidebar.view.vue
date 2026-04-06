<script setup lang="ts">
import type { SidebarViewModel } from '~/presenters/package-header.presenter'
import type { LicensePermission } from '~/core/package/license.registry'

const props = defineProps<SidebarViewModel & { installCopied: boolean }>()
const emit = defineEmits<{ copy: [] }>()
const badgeCopied = ref(false)

async function copyBadge() {
  await navigator.clipboard.writeText(props.badgeMarkdown)
  badgeCopied.value = true
  window.setTimeout(() => { badgeCopied.value = false }, 2000)
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-section">
      <div class="overall-card">
        <span class="overall-brand">pkg<span>lens</span></span>
        <span class="overall-score">{{ overallScore }}<span class="overall-max">/100</span></span>
      </div>
      <div class="scores-row">
        <ScoreCircleView v-for="s in scores" :key="s.label" v-bind="s" />
      </div>
    </div>

    <div class="sidebar-section">
      <div class="maintainer-line">
        <span class="sidebar-title">Maintainers</span>
        <span class="maintainer-count" :class="maintainerCount === 1 ? 'risk-high' : maintainerCount === 2 ? 'risk-medium' : ''">{{ maintainerCount }}</span>
      </div>
    </div>

    <div class="sidebar-section">
      <button class="install-btn mono" @click="emit('copy')">
        <span>{{ installCommand }}</span>
        <svg v-if="!installCopied" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="var(--green)" stroke-width="2.5" width="14" height="14"><polyline points="20 6 9 17 4 12" /></svg>
      </button>
    </div>

    <div class="sidebar-section">
      <div class="sidebar-title">Explore on</div>
      <div class="explore-links">
        <a v-for="link in quickLinks" :key="link.label" :href="link.href" target="_blank" rel="noopener" class="explore-link">
          <span>{{ link.description }}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
        </a>
      </div>
    </div>

    <div class="sidebar-section">
      <div class="sidebar-title">License</div>
      <div class="sidebar-license">{{ license }}</div>
      <div class="license-perms">
        <div v-for="([type, label], i) in licensePermissions" :key="i" class="license-perm">
          <span :class="type">{{ type === 'check' ? '✓' : '✗' }}</span> {{ label }}
        </div>
      </div>
    </div>

    <div v-if="recentVersions.length > 0" class="sidebar-section">
      <div class="sidebar-title">Recent Versions</div>
      <div class="recent-versions">
        <div v-for="v in recentVersions" :key="v.version" class="recent-version">
          <span class="rv-version mono">{{ v.version }}</span>
          <span class="rv-date">{{ v.date }}</span>
        </div>
      </div>
    </div>
    <div class="sidebar-section">
      <div class="sidebar-title">Badge</div>
      <div class="badge-row" @click="copyBadge">
        <img :src="badgeUrl.replace('https://pkglens.com', '')" alt="" height="20">
        <svg v-if="!badgeCopied" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="var(--green)" stroke-width="2.5" width="14" height="14"><polyline points="20 6 9 17 4 12" /></svg>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar { padding-top: 8px; }
.sidebar-section { padding: 14px 0; border-bottom: 1px solid var(--border); }
.sidebar-section:first-child { padding-top: 0; }
.sidebar-section:last-child { border-bottom: none; }
.sidebar-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--text-dim); margin-bottom: 8px; }

.overall-card { display: flex; align-items: baseline; justify-content: space-between; padding: 10px 14px; margin-bottom: 20px; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-md); }
.overall-brand { font-size: 13px; font-weight: 700; color: var(--accent); }
.overall-brand span { color: var(--text-dim); font-weight: 500; }
.overall-score { font-size: 16px; font-weight: 800; color: var(--text-bright); }
.overall-max { font-size: 16px; color: var(--text-dim); font-weight: 500; }
.scores-row { display: flex; gap: 16px; justify-content: center; }

.maintainer-line { display: flex; align-items: center; justify-content: space-between; }
.maintainer-line .sidebar-title { margin-bottom: 0; }
.maintainer-count { font-size: 15px; font-weight: 700; color: var(--text-bright); }
.maintainer-count.risk-high { color: var(--red); }
.maintainer-count.risk-medium { color: var(--orange); }

.install-btn { display: flex; align-items: center; justify-content: center; gap: 6px; width: 100%; padding: 8px 12px; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-md); color: var(--text-dim); font-size: 12px; cursor: pointer; transition: all 0.15s; }
.install-btn:hover { border-color: var(--accent); color: var(--accent); }

.explore-links { display: flex; flex-direction: column; gap: 6px; }
.explore-link { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-md); color: var(--text); font-size: 12px; text-decoration: none; transition: all 0.15s; }
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

.badge-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 12px; background: var(--bg-card); border: 1px solid var(--border);
  border-radius: var(--radius-md); cursor: pointer; transition: all 0.15s;
}
.badge-row:hover { border-color: var(--accent); }
.badge-row img { display: block; }
.badge-row svg { color: var(--text-dim); flex-shrink: 0; }
.badge-row:hover svg { color: var(--accent); }
</style>

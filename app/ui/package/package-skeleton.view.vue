<script setup lang="ts">
defineProps<{ packageName: string }>()
</script>

<template>
  <div class="page-layout">
    <main class="main-col">
      <!-- Package top skeleton -->
      <div class="pkg-top">
        <div class="icon-skel pulse" />
        <div class="info-skel">
          <div class="name-skel pulse" />
          <div class="desc-skel pulse" />
          <div class="desc-skel short pulse" />
          <div class="sparkline-skel pulse" />
          <div class="badges-skel">
            <div class="badge-skel pulse" /><div class="badge-skel pulse" /><div class="badge-skel pulse" />
          </div>
        </div>
      </div>

      <!-- Stats bar skeleton -->
      <div class="stats-bar">
        <div v-for="i in 4" :key="i" class="stat-item">
          <div class="stat-label-skel pulse" />
          <div class="stat-value-skel pulse" />
          <div class="stat-sub-skel pulse" />
        </div>
      </div>

      <!-- Tabs skeleton -->
      <div class="tabs-skel">
        <div v-for="i in 5" :key="i" class="tab-skel pulse" />
      </div>

      <!-- Content skeleton -->
      <div class="section-title-skel pulse" />
      <div v-for="i in 8" :key="i" class="dep-row-skel">
        <div class="dep-name-skel pulse" :style="{ width: (120 + Math.random() * 80) + 'px' }" />
        <div class="dep-version-skel pulse" />
        <div class="dep-badge-skel pulse" />
      </div>
    </main>

    <!-- Sidebar skeleton -->
    <aside class="sidebar">
      <div class="scores-skel">
        <div v-for="i in 3" :key="i" class="score-skel pulse" />
      </div>
      <div class="install-skel pulse" />
      <div class="sidebar-block" v-for="i in 3" :key="i">
        <div class="sidebar-title-skel pulse" />
        <div class="sidebar-line-skel pulse" />
        <div class="sidebar-line-skel short pulse" />
      </div>
    </aside>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.15; }
}
.pulse { animation: pulse 1.8s ease-in-out infinite; background: var(--border); border-radius: 4px; }

.page-layout { max-width: 1080px; margin: 0 auto; padding: var(--space-lg); display: grid; grid-template-columns: 1fr 260px; gap: 40px; }
.main-col { min-width: 0; }

.pkg-top { display: flex; gap: var(--space-md); margin-bottom: var(--space-lg); }
.icon-skel { width: 48px; height: 48px; border-radius: var(--radius-lg); flex-shrink: 0; }
.info-skel { flex: 1; }
.name-skel { height: 24px; width: 180px; margin-bottom: 10px; }
.desc-skel { height: 14px; width: 100%; margin-bottom: 6px; }
.desc-skel.short { width: 60%; }
.sparkline-skel { height: 36px; width: 200px; margin: 10px 0; border-radius: 6px; }
.badges-skel { display: flex; gap: 6px; }
.badge-skel { height: 22px; width: 60px; border-radius: 4px; }

.stats-bar { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border); border-radius: var(--radius-lg); overflow: hidden; margin-bottom: var(--space-lg); }
.stat-item { background: var(--bg-card); padding: 16px 20px; }
.stat-label-skel { height: 10px; width: 80px; margin-bottom: 10px; }
.stat-value-skel { height: 28px; width: 70px; margin-bottom: 6px; }
.stat-sub-skel { height: 10px; width: 100px; }

.tabs-skel { display: flex; gap: 0; border-bottom: 1px solid var(--border); margin-bottom: var(--space-lg); padding-bottom: 12px; }
.tab-skel { height: 16px; width: 80px; margin-right: 20px; }

.section-title-skel { height: 10px; width: 200px; margin-bottom: var(--space-md); }
.dep-row-skel { display: flex; align-items: center; gap: var(--space-sm); padding: 6px 0; }
.dep-name-skel { height: 14px; }
.dep-version-skel { height: 14px; width: 50px; }
.dep-badge-skel { height: 18px; width: 32px; margin-left: auto; }

.sidebar { padding-top: var(--space-xl); }
.scores-skel { display: flex; gap: 16px; justify-content: center; margin-bottom: var(--space-md); }
.score-skel { width: 52px; height: 70px; border-radius: 50% 50% 4px 4px; }
.install-skel { height: 36px; width: 100%; margin-bottom: var(--space-md); border-radius: var(--radius-md); }
.sidebar-block { padding: var(--space-md) 0; border-top: 1px solid var(--border); }
.sidebar-title-skel { height: 10px; width: 80px; margin-bottom: 12px; }
.sidebar-line-skel { height: 14px; width: 100%; margin-bottom: 8px; }
.sidebar-line-skel.short { width: 60%; }

@media (max-width: 820px) { .page-layout { grid-template-columns: 1fr; } }
</style>

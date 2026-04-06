<script setup lang="ts">
import type { BundlePanelViewModel } from '~/presenters/bundle-panel.presenter'

defineProps<BundlePanelViewModel>()
</script>

<template>
  <div>
    <!-- Empty state -->
    <div v-if="!hasData" class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
      <p>{{ emptyMessage }}</p>
    </div>

    <template v-if="hasData">
      <!-- What you're paying for -->
      <div class="story-section">
        <div class="section-title">What you're paying for</div>
        <div class="story-sub">{{ headerLabel }}</div>

        <div v-for="item in items" :key="item.name" class="story-row">
          <span class="story-name mono">{{ item.name }}</span>
          <div class="story-bar-track">
            <div class="story-bar-fill" :style="{ width: item.percent + '%', background: item.color }" />
          </div>
          <span class="story-pct mono">{{ item.percentLabel }}</span>
          <span class="story-size mono">{{ item.sizeLabel }}</span>
        </div>

        <div v-if="smallDepsLabel" class="story-small">{{ smallDepsLabel }}</div>
      </div>

      <!-- Tree-shake + Loading side by side -->
      <div class="insights-grid">
        <div v-if="treeShake" class="insight-card" :class="{ good: treeShake.isShakeable }">
          <div class="insight-header">
            <span class="section-title">Tree-shaking</span>
            <span class="shake-badge" :class="treeShake.isShakeable ? 'good' : 'bad'">{{ treeShake.label }}</span>
          </div>
          <p class="insight-desc">{{ treeShake.description }}</p>
        </div>

        <div v-if="loadingImpact.length > 0" class="insight-card">
          <div class="section-title">Loading impact</div>
          <div class="impact-row">
            <div v-for="item in loadingImpact" :key="item.label" class="impact-item">
              <span class="impact-value">{{ item.value }}</span>
              <span class="impact-label">{{ item.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.empty-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: var(--space-xl) var(--space-lg); gap: 12px; text-align: center; color: var(--text-dim);
}
.empty-state p { font-size: 13px; max-width: 400px; line-height: 1.5; }

/* ── Story ── */
.story-section { margin-bottom: var(--space-lg); }
.story-sub { font-size: 13px; color: var(--text-dim); margin-bottom: 14px; }

.story-row { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; font-size: 13px; }
.story-name { width: 140px; color: var(--text-dim); text-overflow: ellipsis; overflow: hidden; white-space: nowrap; flex-shrink: 0; }
.story-bar-track { flex: 1; height: 10px; background: var(--bg); border-radius: 5px; overflow: hidden; }
.story-bar-fill { height: 100%; border-radius: 5px; transition: width 0.6s ease; min-width: 3px; }
.story-pct { width: 32px; text-align: right; color: var(--text-dim); font-size: 11px; flex-shrink: 0; }
.story-size { width: 64px; text-align: right; color: var(--text-dim); font-size: 12px; flex-shrink: 0; }

.story-small {
  font-size: 12px; color: var(--text-dim); padding: 10px 14px;
  background: var(--bg-card); border-radius: var(--radius-md); margin-top: 10px;
}

/* ── Insights grid ── */
.insights-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.insight-card {
  padding: 16px; border-radius: var(--radius-lg);
  background: var(--bg-card); border: 1px solid var(--border);
}
.insight-card.good { border-color: rgba(154, 206, 106, 0.25); }
.insight-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.insight-header .section-title { margin-bottom: 0; }
.insight-desc { font-size: 12px; color: var(--text-dim); line-height: 1.4; }

.shake-badge { font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: var(--radius-sm); font-family: var(--font-mono); }
.shake-badge.good { color: var(--green); background: var(--green-bg); }
.shake-badge.bad { color: var(--text-dim); background: var(--bg); }

.impact-row { display: flex; gap: 32px; justify-content: center; padding: 4px 0; }
.impact-item { text-align: center; }
.impact-value { font-size: 20px; font-weight: 700; color: var(--text-bright); display: block; }
.impact-label { font-size: 11px; color: var(--text-dim); }

@media (max-width: 600px) { .insights-grid { grid-template-columns: 1fr; } }
</style>

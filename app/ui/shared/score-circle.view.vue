<script setup lang="ts">
import type { ScoreViewModel } from '~/presenters/score.presenter'

defineProps<ScoreViewModel>()

const RADIUS = 22
const showBreakdown = ref(false)
</script>

<template>
  <div class="score-item" @mouseenter="showBreakdown = true" @mouseleave="showBreakdown = false">
    <div class="circle">
      <svg viewBox="0 0 52 52">
        <circle class="bg-ring" cx="26" cy="26" :r="RADIUS" />
        <circle class="fg-ring" cx="26" cy="26" :r="RADIUS" :stroke="color" :stroke-dasharray="circumference" :stroke-dashoffset="dashOffset" />
      </svg>
      <span class="number" :style="{ color }">{{ value }}</span>
    </div>
    <div class="label">{{ label }}</div>
    <div class="grade" :style="{ color }">{{ grade }}</div>

    <div v-if="showBreakdown && factors.length > 0" class="breakdown">
      <div class="breakdown-title">{{ label }} score</div>
      <div v-for="f in factors" :key="f.label" class="breakdown-row">
        <span class="breakdown-label">{{ f.label }}</span>
        <span class="breakdown-impact" :class="{ positive: f.isPositive, negative: f.isNegative }">{{ f.impact }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.score-item { text-align: center; position: relative; cursor: default; }
.circle {
  width: 52px; height: 52px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 16px; margin-bottom: 4px; position: relative;
}
.circle svg { position: absolute; top: 0; left: 0; width: 52px; height: 52px; transform: rotate(-90deg); }
.circle svg circle { fill: none; stroke-width: 3; stroke-linecap: round; }
.bg-ring { stroke: var(--border); }
.fg-ring { transition: stroke-dashoffset 1s ease; }
.number { position: relative; z-index: 1; }
.label { font-size: 11px; color: var(--text-dim); }
.grade { font-size: 11px; font-weight: 600; }

.breakdown {
  position: absolute; top: 100%; left: 50%; transform: translateX(-50%);
  margin-top: 8px; padding: 12px 16px; background: var(--bg-card);
  border: 1px solid var(--border); border-radius: var(--radius-md);
  min-width: 240px; text-align: left; z-index: 50;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}
.breakdown-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-dim); margin-bottom: 8px; }
.breakdown-row { display: flex; justify-content: space-between; align-items: center; font-size: 12px; padding: 3px 0; }
.breakdown-label { color: var(--text); }
.breakdown-impact { font-family: var(--font-mono); font-weight: 600; color: var(--text-dim); }
.breakdown-impact.positive { color: var(--green); }
.breakdown-impact.negative { color: var(--red); }
</style>

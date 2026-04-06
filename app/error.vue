<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const is404 = computed(() => props.error.statusCode === 404)
const { suggestions, search: searchSuggestions } = useSearchSuggestions()

function handleNavigate(name: string) { clearError({ redirect: `/package/${encodeURIComponent(name)}` }) }
</script>

<template>
  <div class="error-page">
    <header class="header">
      <div class="header-inner">
        <span class="logo" @click="clearError({ redirect: '/' })">pkg<span>lens</span></span>
        <SearchBarView variant="header" :suggestions="suggestions" @search="handleNavigate" @input="(q) => searchSuggestions(q, 'npm')" />
      </div>
    </header>

    <main class="content">
      <!-- Illustration: lost package -->
      <svg class="illustration" viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Shadow -->
        <ellipse cx="120" cy="185" rx="50" ry="6" fill="#3a3b55" opacity="0.3"/>
        <!-- Box body -->
        <rect x="72" y="90" width="96" height="75" rx="5" fill="#24253a" stroke="#7aa2f7" stroke-width="2"/>
        <!-- Box flap left -->
        <path d="M72 90 L96 60 L120 78 L120 90Z" fill="#2a2b40" stroke="#7aa2f7" stroke-width="2" stroke-linejoin="round"/>
        <!-- Box flap right (open, tilted) -->
        <path d="M168 90 L148 52 L120 78 L120 90Z" fill="#24253a" stroke="#7aa2f7" stroke-width="2" stroke-linejoin="round"/>
        <!-- Tape -->
        <rect x="114" y="90" width="12" height="75" fill="#3a3b55" opacity="0.3" rx="1"/>
        <!-- Question mark floating out -->
        <text x="132" y="48" font-family="system-ui, sans-serif" font-size="32" font-weight="800" fill="#7aa2f7" opacity="0.7">?</text>
        <!-- Sparkles -->
        <circle cx="80" cy="52" r="2.5" fill="#9ece6a" opacity="0.5">
          <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="170" cy="65" r="2" fill="#e0af68" opacity="0.4">
          <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="60" cy="80" r="1.5" fill="#bb9af7" opacity="0.4">
          <animate attributeName="opacity" values="0.4;0.15;0.4" dur="1.8s" repeatCount="indefinite"/>
        </circle>
        <circle cx="185" cy="95" r="2" fill="#7dcfff" opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.1;0.3" dur="3s" repeatCount="indefinite"/>
        </circle>
        <!-- Question mark bounce -->
        <animateTransform xlink:href="#qmark" attributeName="transform" type="translate" values="0,0;0,-4;0,0" dur="2s" repeatCount="indefinite"/>
      </svg>

      <p class="code">{{ error.statusCode }}</p>
      <h1 class="title">{{ is404 ? 'This package got lost' : 'Something went wrong' }}</h1>
      <p class="hint">{{ is404 ? 'We looked everywhere but couldn\'t find this page. Try searching for a package instead.' : 'An unexpected error occurred. Please try again.' }}</p>
      <button class="home-btn" @click="clearError({ redirect: '/' })">Back to homepage</button>
    </main>
  </div>
</template>

<style scoped>
.error-page { min-height: 100vh; background: var(--bg, #1a1b26); color: var(--text, #c0caf5); font-family: 'Inter', system-ui, sans-serif; }
.header { padding: 12px 24px; border-bottom: 1px solid var(--border, #3a3b55); background: var(--bg-header, #16171f); }
.header-inner { max-width: 1080px; margin: 0 auto; display: flex; align-items: center; gap: 24px; }
.logo { font-size: 20px; font-weight: 800; color: #7aa2f7; letter-spacing: -0.5px; cursor: pointer; flex-shrink: 0; }
.logo span { color: #8890b0; font-weight: 500; }

.content {
  max-width: 480px; margin: 0 auto; padding: 48px 24px;
  display: flex; flex-direction: column; align-items: center; text-align: center; gap: 10px;
}
.illustration { width: 200px; height: 170px; margin-bottom: 8px; }
.code { font-size: 13px; font-weight: 700; color: #7aa2f7; margin: 0; opacity: 0.5; letter-spacing: 2px; }
.title { font-size: 24px; font-weight: 700; color: #e0e6ff; margin: 0; }
.hint { font-size: 14px; color: #8890b0; margin: 0; line-height: 1.6; }
.home-btn {
  margin-top: 12px; padding: 10px 24px; background: #24253a;
  border: 1px solid #3a3b55; border-radius: 8px; color: #8890b0;
  cursor: pointer; font-size: 14px; font-family: inherit; transition: all 0.15s;
}
.home-btn:hover { border-color: #7aa2f7; color: #7aa2f7; }
</style>

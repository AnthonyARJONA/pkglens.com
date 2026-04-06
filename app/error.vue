<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const is404 = computed(() => props.error.statusCode === 404)
const query = ref('')
const router = useRouter()

function handleSearch() {
  if (!query.value.trim()) return
  clearError({ redirect: `/package/${encodeURIComponent(query.value.trim())}` })
}

function goHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="error-page">
    <div class="error-header" @click="goHome">
      <span class="logo">pkg<span class="dim">lens</span></span>
    </div>
    <div class="error-body">
      <h1 class="error-code">{{ error.statusCode }}</h1>
      <p class="error-msg">
        {{ is404 ? 'Page not found' : 'Something went wrong' }}
      </p>
      <p class="error-hint">
        {{ is404 ? "The page you're looking for doesn't exist." : error.message }}
      </p>
      <form class="error-search" @submit.prevent="handleSearch">
        <input v-model="query" placeholder="Search for a package…" class="search-input">
        <button type="submit" class="search-btn">Search</button>
      </form>
      <button class="home-link" @click="goHome">← Back to homepage</button>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  min-height: 100vh; background: #1a1b26; color: #c0caf5;
  font-family: 'Inter', system-ui, sans-serif;
  display: flex; flex-direction: column; align-items: center;
}
.error-header {
  padding: 24px; cursor: pointer; width: 100%;
  text-align: center; border-bottom: 1px solid #3a3b55;
}
.logo { font-size: 24px; font-weight: 800; color: #7aa2f7; letter-spacing: -1px; }
.logo .dim { color: #8890b0; font-weight: 500; }
.error-body {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; flex: 1; gap: 16px; padding: 24px;
}
.error-code { font-size: 72px; font-weight: 800; color: #7aa2f7; margin: 0; }
.error-msg { font-size: 24px; font-weight: 600; color: #e0e6ff; margin: 0; }
.error-hint { font-size: 14px; color: #8890b0; margin: 0 0 16px; }
.error-search { display: flex; gap: 8px; width: 100%; max-width: 400px; }
.search-input {
  flex: 1; padding: 10px 16px; background: #2a2b40; border: 1px solid #3a3b55;
  border-radius: 8px; color: #c0caf5; font-size: 14px; font-family: inherit;
  outline: none;
}
.search-input:focus { border-color: #7aa2f7; }
.search-btn {
  padding: 10px 20px; background: #7aa2f7; color: #1a1b26;
  border: none; border-radius: 8px; font-weight: 600;
  cursor: pointer; font-family: inherit; font-size: 14px;
}
.search-btn:hover { opacity: 0.9; }
.home-link {
  background: none; border: none; color: #8890b0; cursor: pointer;
  font-size: 14px; font-family: inherit;
}
.home-link:hover { color: #7aa2f7; }
</style>

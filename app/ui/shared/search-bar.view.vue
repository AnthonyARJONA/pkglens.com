<script setup lang="ts">
import { detectEcosystem, ECOSYSTEMS, type EcosystemId } from '~/core/ecosystem/ecosystem.types'
import { DEBOUNCE_SEARCH_MS } from '~/core/constants'
import type { SearchSuggestion } from '~/composables/use-search-suggestions'

const props = defineProps<{
  suggestions: readonly SearchSuggestion[]
  variant: 'header' | 'hero'
}>()

const emit = defineEmits<{
  search: [name: string, ecosystem: EcosystemId]
  input: [query: string, ecosystem: EcosystemId]
}>()

const query = ref('')
const showDropdown = ref(false)
const userSelectedEco = ref<EcosystemId | null>(null)
const detectedEco = ref<EcosystemId | null>(null)

const activeEco = computed<EcosystemId>(() => userSelectedEco.value ?? detectedEco.value ?? 'npm')
const activeEcoMeta = computed(() => ECOSYSTEMS.find((e) => e.id === activeEco.value)!)

function handleInput() {
  if (!userSelectedEco.value) detectedEco.value = detectEcosystem(query.value)
  emit('input', query.value, activeEco.value)
  showDropdown.value = true
}

function handleSearch() {
  const name = query.value.trim()
  if (name) { showDropdown.value = false; emit('search', name, activeEco.value) }
}

function selectSuggestion(name: string) {
  showDropdown.value = false; query.value = name; emit('search', name, activeEco.value)
}

function delayHide() { window.setTimeout(() => { showDropdown.value = false }, 200) }

function onKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    ;(document.querySelector('.search-bar-input') as HTMLInputElement | null)?.focus()
  }
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="search-bar" :class="{ 'is-hero': variant === 'hero' }" @focusin="showDropdown = true" @focusout="delayHide()">
    <EcosystemSelectorView :active-id="activeEco" :active-label="activeEcoMeta.label" @select="(id) => userSelectedEco = id" />
    <div class="divider" />
    <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
    <input v-model="query" class="search-bar-input" type="text" :placeholder="activeEcoMeta.placeholder" autocomplete="off" spellcheck="false" :autofocus="variant === 'hero'" @input="handleInput" @keydown.enter="handleSearch">
    <kbd class="kbd-hint"><span class="kbd-symbol">&#8984;</span>K</kbd>
    <SearchDropdownView v-if="showDropdown" :suggestions="suggestions" @select="selectSuggestion" />
  </div>
</template>

<style scoped>
.search-bar { display: flex; flex-direction: row; align-items: center; background: var(--bg-input); border: 1px solid var(--border); border-radius: 12px; position: relative; transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s; max-width: 640px; height: 42px; flex-grow: 1; flex-shrink: 0; flex-basis: auto; }
.search-bar:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(122, 162, 247, 0.12), 0 4px 16px rgba(0, 0, 0, 0.2); transform: scale(1.01); }
.search-bar.is-hero { max-width: 600px; border-radius: 16px; height: 52px; width: 100%; flex-grow: 0; }
.search-bar.is-hero .search-bar-input { font-size: 17px; }
.divider { width: 1px; height: 20px; background: var(--border); flex-shrink: 0; }
.search-icon { width: 16px; height: 16px; color: var(--text-dim); margin-left: 12px; flex-shrink: 0; }
.search-bar-input { flex: 1; padding: 0 12px 0 8px; background: transparent; border: none; color: var(--text-bright); font-size: 14px; font-family: var(--font-sans); outline: none; min-width: 0; height: 100%; }
.search-bar-input::placeholder { color: var(--text-dim); }
.kbd-hint { display: flex; align-items: center; gap: 2px; margin-right: 12px; padding: 2px 6px; background: var(--bg); border: 1px solid var(--border); border-radius: 4px; font-size: 11px; font-family: var(--font-sans); color: var(--text-dim); flex-shrink: 0; line-height: 1; }
.kbd-symbol { font-size: 13px; }
.search-bar:focus-within .kbd-hint { opacity: 0; pointer-events: none; }
</style>

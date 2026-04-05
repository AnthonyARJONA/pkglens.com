<script setup lang="ts">
import { ECOSYSTEMS, detectEcosystem, type EcosystemId } from '~/core/ecosystem/ecosystem.types'
import type { SearchSuggestion } from '~/composables/use-search-suggestions'

const props = defineProps<{
  suggestions: readonly SearchSuggestion[]
  variant: 'header' | 'hero'
}>()

const emit = defineEmits<{
  search: [name: string, ecosystem: EcosystemId]
  input: [query: string]
}>()

const query = ref('')
const showDropdown = ref(false)
const showEcoMenu = ref(false)
const userSelectedEco = ref<EcosystemId | null>(null)
const detectedEco = ref<EcosystemId | null>(null)

const activeEco = computed<EcosystemId>(() => userSelectedEco.value ?? detectedEco.value ?? 'npm')
const activeEcoMeta = computed(() => ECOSYSTEMS.find((e) => e.id === activeEco.value)!)
const isHero = computed(() => props.variant === 'hero')

function handleInput() {
  emit('input', query.value)
  showDropdown.value = true

  if (!userSelectedEco.value) {
    detectedEco.value = detectEcosystem(query.value)
  }
}

function handleSearch() {
  const name = query.value.trim()
  if (name) {
    showDropdown.value = false
    emit('search', name, activeEco.value)
  }
}

function selectSuggestion(name: string) {
  showDropdown.value = false
  query.value = name
  emit('search', name, activeEco.value)
}

function selectEcosystem(id: EcosystemId) {
  const eco = ECOSYSTEMS.find((e) => e.id === id)
  if (!eco?.available) return
  userSelectedEco.value = id
  showEcoMenu.value = false
}

function delayHideDropdown() {
  window.setTimeout(() => { showDropdown.value = false }, 200)
}

function handleGlobalKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    const input = document.querySelector('.search-bar-input') as HTMLInputElement | null
    input?.focus()
  }
}

onMounted(() => { document.addEventListener('keydown', handleGlobalKeydown) })
onUnmounted(() => { document.removeEventListener('keydown', handleGlobalKeydown) })
</script>

<template>
  <div
    class="search-bar"
    :class="{ 'is-hero': isHero }"
    @focusin="showDropdown = true"
    @focusout="delayHideDropdown()"
  >
    <!-- Ecosystem selector -->
    <div class="eco-selector" @click.stop="showEcoMenu = !showEcoMenu">
      <span class="eco-label">{{ activeEcoMeta.label }}</span>
      <svg class="eco-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
        <polyline points="6 9 12 15 18 9" />
      </svg>
      <div v-if="showEcoMenu" class="eco-menu" @click.stop>
        <div
          v-for="eco in ECOSYSTEMS"
          :key="eco.id"
          class="eco-option"
          :class="{ active: eco.id === activeEco, disabled: !eco.available }"
          @mousedown.prevent="selectEcosystem(eco.id)"
        >
          <span>{{ eco.label }}</span>
          <span v-if="!eco.available" class="eco-soon">soon</span>
        </div>
      </div>
    </div>

    <div class="divider" />

    <!-- Search input -->
    <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
    </svg>
    <input
      v-model="query"
      class="search-bar-input"
      type="text"
      :placeholder="activeEcoMeta.placeholder"
      autocomplete="off"
      spellcheck="false"
      :autofocus="isHero"
      @input="handleInput"
      @keydown.enter="handleSearch"
    >

    <!-- Keyboard shortcut hint -->
    <kbd class="kbd-hint">
      <span class="kbd-symbol">&#8984;</span>K
    </kbd>

    <!-- Detected ecosystem hint -->
    <span v-if="detectedEco && !userSelectedEco" class="eco-hint">
      {{ ECOSYSTEMS.find((e) => e.id === detectedEco)?.label }}
    </span>

    <!-- Autocomplete dropdown -->
    <div v-if="showDropdown && suggestions.length > 0" class="dropdown">
      <div
        v-for="s in suggestions"
        :key="s.name"
        class="dropdown-item"
        @mousedown.prevent="selectSuggestion(s.name)"
      >
        <span class="dropdown-name">{{ s.name }}</span>
        <span class="dropdown-desc">{{ s.description }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: 12px;
  position: relative;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  max-width: 640px;
  height: 42px;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
}
.search-bar:focus-within {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(122, 162, 247, 0.12), 0 4px 16px rgba(0, 0, 0, 0.2);
  transform: scale(1.01);
}
.search-bar.is-hero {
  max-width: 600px;
  border-radius: 16px;
  height: 52px;
  width: 100%;
  flex-grow: 0;
}
.search-bar.is-hero .search-bar-input { font-size: 17px; }
.search-bar.is-hero .eco-label { font-size: 14px; }

/* ── Ecosystem selector ── */
.eco-selector {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 10px 0 14px;
  cursor: pointer;
  flex-shrink: 0;
  position: relative;
  user-select: none;
  height: 100%;
}
.eco-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
}
.eco-chevron { color: var(--text-dim); }

.eco-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
  z-index: 300;
  min-width: 140px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}
.eco-option {
  padding: 8px 14px;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.1s;
  color: var(--text);
}
.eco-option:hover { background: var(--bg-input); }
.eco-option.active { color: var(--accent); font-weight: 600; }
.eco-option.disabled { color: var(--text-dim); cursor: default; }
.eco-option.disabled:hover { background: transparent; }
.eco-soon { font-size: 10px; color: var(--text-dim); font-style: italic; }

/* ── Divider ── */
.divider { width: 1px; height: 20px; background: var(--border); flex-shrink: 0; }

/* ── Search input ── */
.search-icon {
  width: 16px; height: 16px; color: var(--text-dim);
  margin-left: 12px; flex-shrink: 0;
}
.search-bar-input {
  flex: 1;
  padding: 0 12px 0 8px;
  background: transparent;
  border: none;
  color: var(--text-bright);
  font-size: 14px;
  font-family: var(--font-sans);
  outline: none;
  min-width: 0;
  height: 100%;
}
.search-bar-input::placeholder { color: var(--text-dim); }

/* ── Keyboard hint ── */
.kbd-hint {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-right: 12px;
  padding: 2px 6px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 4px;
  font-size: 11px;
  font-family: var(--font-sans);
  color: var(--text-dim);
  flex-shrink: 0;
  line-height: 1;
}
.kbd-symbol { font-size: 13px; }
.search-bar:focus-within .kbd-hint { opacity: 0; pointer-events: none; }

/* ── Eco hint ── */
.eco-hint {
  font-size: 10px;
  color: var(--accent);
  margin-right: 12px;
  padding: 2px 6px;
  background: var(--accent-bg);
  border-radius: var(--radius-sm);
  flex-shrink: 0;
  opacity: 0.8;
}

/* ── Dropdown ── */
.dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0; right: 0;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
  z-index: 200;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}
.dropdown-item {
  padding: 10px 16px;
  cursor: pointer;
  display: flex;
  gap: 10px;
  align-items: baseline;
  transition: background 0.1s;
}
.dropdown-item:hover { background: var(--bg-input); }
.dropdown-name { font-weight: 600; color: var(--accent); font-size: 14px; white-space: nowrap; }
.dropdown-desc { font-size: 12px; color: var(--text-dim); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>

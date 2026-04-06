<script setup lang="ts">
import type { EcosystemId } from '~/core/ecosystem/ecosystem.types'

const router = useRouter()
const { suggestions: searchResults, search: searchInput, clear: clearSearch } = useSearchSuggestions()

const QUICK_LINKS: Record<EcosystemId, Array<{ name: string; ecosystem: EcosystemId }>> = {
  npm: [
    { name: 'react', ecosystem: 'npm' },
    { name: 'express', ecosystem: 'npm' },
    { name: 'lodash', ecosystem: 'npm' },
    { name: 'axios', ecosystem: 'npm' },
    { name: 'zod', ecosystem: 'npm' },
    { name: 'hono', ecosystem: 'npm' },
    { name: 'next', ecosystem: 'npm' },
    { name: 'prisma', ecosystem: 'npm' },
  ],
  packagist: [
    { name: 'laravel/framework', ecosystem: 'packagist' },
    { name: 'symfony/console', ecosystem: 'packagist' },
    { name: 'monolog/monolog', ecosystem: 'packagist' },
    { name: 'guzzlehttp/guzzle', ecosystem: 'packagist' },
    { name: 'phpunit/phpunit', ecosystem: 'packagist' },
    { name: 'doctrine/orm', ecosystem: 'packagist' },
  ],
  pypi: [],
  cargo: [],
  go: [],
}

const SCAN_LABELS: Record<EcosystemId, string> = {
  npm: 'Scan a package.json',
  packagist: 'Scan a composer.json',
  pypi: 'Scan a requirements.txt',
  cargo: 'Scan a Cargo.toml',
  go: 'Scan a go.mod',
}

const activeEco = ref<EcosystemId>('npm')
const quickLinks = computed(() => QUICK_LINKS[activeEco.value] || QUICK_LINKS.npm)
const scanLabel = computed(() => SCAN_LABELS[activeEco.value])

function handleSearch(name: string, eco?: EcosystemId) {
  if (eco) activeEco.value = eco
  clearSearch()
  const query = eco && eco !== 'npm' ? { eco } : {}
  router.push({ path: `/package/${encodeURIComponent(name)}`, query })
}

function handleInput(q: string, eco: EcosystemId) {
  activeEco.value = eco
  searchInput(q, eco)
}

useHead({ title: 'pkglens — see inside your packages' })
</script>

<template>
  <HomeSearchView
    :quick-links="quickLinks"
    :search-results="searchResults"
    :active-ecosystem="activeEco"
    :scan-label="scanLabel"
    @search="handleSearch"
    @input="handleInput"
  />
</template>

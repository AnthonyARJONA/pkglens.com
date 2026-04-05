<script setup lang="ts">
const router = useRouter()
const quickLinks = ['react', 'express', 'lodash', 'axios', 'zod', 'hono', 'next', 'prisma']
const { suggestions: searchResults, search: searchInput, clear: clearSearch } = useSearchSuggestions()

function handleSearch(name: string) {
  clearSearch()
  router.push(`/package/${encodeURIComponent(name)}`)
}

useHead({ title: 'pkglens — see inside your packages' })
</script>

<template>
  <HomeSearchView
    :quick-links="quickLinks"
    :search-results="searchResults"
    @search="handleSearch"
    @input="searchInput"
  />
</template>

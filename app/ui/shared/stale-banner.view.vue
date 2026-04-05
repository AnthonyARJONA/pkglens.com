<template>
  <div class="stale-banner">
    Data may be outdated — source APIs were unavailable
  </div>
</template>

<style scoped>
.stale-banner {
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
  font-size: 12px;
  background: var(--yellow-bg);
  color: var(--orange);
  border: 1px solid rgba(224, 175, 104, 0.25);
  margin-bottom: var(--space-md);
}
</style>

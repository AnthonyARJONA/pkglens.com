<script setup lang="ts">
defineProps<{ loading: boolean; error: string | null }>()
const emit = defineEmits<{ scan: [content: string, filename: string] }>()

function handleFile(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  readFile(file)
}

function handleDrop(event: DragEvent) {
  event.preventDefault()
  const file = event.dataTransfer?.files[0]
  if (!file) return
  readFile(file)
}

function readFile(file: File) {
  const reader = new FileReader()
  reader.onload = () => {
    if (typeof reader.result === 'string') emit('scan', reader.result, file.name)
  }
  reader.readAsText(file)
}
</script>

<template>
  <div class="upload-zone" @dragover.prevent @drop="handleDrop">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="40" height="40">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
    </svg>
    <p>Drop your <strong>package.json</strong> or <strong>composer.json</strong> here</p>
    <span class="or">or</span>
    <label class="file-btn">
      Browse file
      <input type="file" accept=".json,.txt,.toml" hidden @change="handleFile">
    </label>
    <p class="detect-hint">We auto-detect the ecosystem from the file structure</p>
    <div v-if="loading" class="scan-loading">
      <div class="spinner" />
      <span>Scanning dependencies…</span>
    </div>
    <p v-if="error" class="scan-error">{{ error }}</p>
  </div>
</template>

<style scoped>
.upload-zone {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: var(--space-xl) var(--space-lg); border: 2px dashed var(--border);
  border-radius: var(--radius-lg); text-align: center; gap: 12px;
  color: var(--text-dim); transition: border-color 0.2s; min-height: 200px;
}
.upload-zone:hover { border-color: var(--accent); }
.upload-zone p { font-size: 14px; }
.or { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
.file-btn {
  padding: 8px 20px; background: var(--bg-card); border: 1px solid var(--border);
  border-radius: var(--radius-md); color: var(--accent); font-size: 13px;
  cursor: pointer; transition: all 0.15s;
}
.file-btn:hover { border-color: var(--accent); background: var(--accent-bg); }
.detect-hint { font-size: 11px; color: var(--text-dim); margin-top: 4px; }
.scan-loading { display: flex; align-items: center; gap: var(--space-sm); margin-top: var(--space-sm); }
.spinner { width: 20px; height: 20px; border: 2px solid var(--border); border-top-color: var(--accent); border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.scan-error { color: var(--red); font-size: 13px; }
</style>

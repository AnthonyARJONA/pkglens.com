interface BreakerState {
  failures: number
  lastFailure: number
  open: boolean
}

const breakers = new Map<string, BreakerState>()

const MAX_FAILURES = 3
const RESET_TIMEOUT = 10 * 60 * 1000 // 10 minutes

export function isCircuitOpen(source: string): boolean {
  const state = breakers.get(source)
  if (!state || !state.open) return false

  // Add jitter so reset time is unpredictable
  const jitter = Math.random() * RESET_TIMEOUT * 0.3
  if (Date.now() - state.lastFailure > RESET_TIMEOUT + jitter) {
    state.open = false
    state.failures = 0
    return false
  }

  return true
}

export function recordFailure(source: string): void {
  const state = breakers.get(source) || { failures: 0, lastFailure: 0, open: false }
  state.failures++
  state.lastFailure = Date.now()

  if (state.failures >= MAX_FAILURES) {
    state.open = true
  }

  breakers.set(source, state)
}

export function recordSuccess(source: string): void {
  breakers.delete(source)
}

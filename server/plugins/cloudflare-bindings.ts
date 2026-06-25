import type { D1Database } from '@cloudflare/workers-types'
import { setD1 } from '../database/d1'

interface CloudflareEnv {
  DB?: D1Database
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', (event) => {
    const env = (event.context as { cloudflare?: { env?: CloudflareEnv } }).cloudflare?.env
    if (env?.DB) setD1(env.DB)
  })
})

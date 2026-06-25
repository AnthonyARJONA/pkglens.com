# Legacy: Docker + SQLite stack

Stack précédent (avant migration Cloudflare Pages + D1 en juin 2026).

## Contenu

- `Dockerfile`, `docker-compose.yml`, `.dockerignore` — image self-hostable Node 20
- `server/database/sqlite.ts` — client `better-sqlite3` synchrone
- `server/plugins/cache-cleanup.ts` — cleanup horaire via `setInterval` + signal handlers
- `server/middleware/rate-limit.ts` — rate-limit `Map` en mémoire (30 req/min/IP)

## Pourquoi conservé

Au cas où on quitte Cloudflare un jour : on remet ces fichiers à leur emplacement
d'origine, on réinstalle `better-sqlite3`, on remet le preset Nitro par défaut, et
on est de retour sur le stack Docker self-host.

## Pour rebasculer

1. `git mv legacy/docker-stack/server/database/sqlite.ts server/database/sqlite.ts` (idem pour les autres)
2. `git mv legacy/docker-stack/Dockerfile Dockerfile` (idem `docker-compose.yml`, `.dockerignore`)
3. Supprimer `server/database/d1.ts` et restaurer le client SQLite dans `server/core/cache/cache.service.ts`
4. `pnpm add better-sqlite3 @types/better-sqlite3`
5. Retirer `preset: 'cloudflare-pages'` et `nitro-cloudflare-dev` de `nuxt.config.ts`
6. `pnpm remove wrangler @cloudflare/workers-types nitro-cloudflare-dev`
7. Supprimer `wrangler.toml` et `migrations/`

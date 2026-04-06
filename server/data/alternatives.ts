export const CURATED_ALTERNATIVES: Record<string, string[]> = {
  // ============================================================
  // NPM PACKAGES
  // ============================================================

  // --- UI Frameworks ---
  'react': ['vue', 'svelte', 'preact', 'solid-js', 'lit', 'angular'],
  'vue': ['react', 'svelte', 'preact', 'solid-js', 'lit', 'angular'],
  'svelte': ['react', 'vue', 'preact', 'solid-js', 'lit'],
  'preact': ['react', 'vue', 'svelte', 'solid-js'],
  'solid-js': ['react', 'vue', 'svelte', 'preact', 'lit'],
  'angular': ['react', 'vue', 'svelte', 'lit', 'solid-js'],
  'lit': ['react', 'vue', 'svelte', 'solid-js', 'preact'],
  'alpinejs': ['petite-vue', 'htmx.org', 'stimulus', 'hyperscript.org'],
  'htmx.org': ['alpinejs', 'stimulus', 'unpoly', 'turbo'],
  'stimulus': ['alpinejs', 'htmx.org', 'petite-vue'],
  'petite-vue': ['alpinejs', 'vue', 'htmx.org'],
  'mithril': ['react', 'preact', 'inferno', 'solid-js'],
  'inferno': ['react', 'preact', 'solid-js'],
  'stencil': ['lit', 'svelte', 'solid-js'],
  'riot': ['vue', 'preact', 'mithril'],
  'marko': ['svelte', 'solid-js', 'lit'],
  'qwik': ['react', 'solid-js', 'svelte', 'astro'],

  // --- Meta Frameworks ---
  'next': ['nuxt', 'remix', '@sveltejs/kit', 'astro', 'gatsby', '@analogjs/platform'],
  'nuxt': ['next', 'remix', '@sveltejs/kit', 'astro', 'gatsby'],
  'remix': ['next', 'nuxt', '@sveltejs/kit', 'astro', 'tanstack-router'],
  '@sveltejs/kit': ['next', 'nuxt', 'remix', 'astro'],
  'astro': ['next', 'nuxt', 'gatsby', '@sveltejs/kit', 'eleventy'],
  'gatsby': ['next', 'nuxt', 'astro', 'remix', '@sveltejs/kit'],
  '@analogjs/platform': ['next', 'nuxt', 'astro'],
  '@builder.io/qwik-city': ['next', 'nuxt', 'remix', 'astro'],
  'eleventy': ['astro', 'gatsby', 'hugo', 'hexo'],
  'hexo': ['eleventy', 'astro', 'gatsby', 'hugo'],
  'vuepress': ['vitepress', 'docusaurus', 'nextra', 'astro'],
  'vitepress': ['vuepress', 'docusaurus', 'nextra', 'astro'],
  'docusaurus': ['vitepress', 'nextra', 'astro', 'vuepress'],
  'nextra': ['docusaurus', 'vitepress', 'astro'],

  // --- HTTP / Web Frameworks ---
  'express': ['fastify', 'hono', 'koa', 'h3', 'elysia', '@hapi/hapi'],
  'fastify': ['express', 'hono', 'koa', 'h3', 'elysia', '@hapi/hapi'],
  'hono': ['express', 'fastify', 'elysia', 'h3', 'itty-router'],
  'koa': ['express', 'fastify', 'hono', 'h3', '@hapi/hapi'],
  'h3': ['express', 'fastify', 'hono', 'elysia', 'koa'],
  'elysia': ['hono', 'fastify', 'express', 'h3'],
  '@hapi/hapi': ['express', 'fastify', 'koa', 'restify'],
  'restify': ['express', 'fastify', '@hapi/hapi', 'koa'],
  '@nestjs/core': ['express', 'fastify', '@adonisjs/core', 'loopback'],
  '@adonisjs/core': ['@nestjs/core', 'express', 'fastify'],
  'itty-router': ['hono', 'h3', 'express'],
  'polka': ['express', 'fastify', 'koa'],
  'micro': ['express', 'fastify', 'hono'],
  'moleculer': ['@nestjs/core', 'seneca', 'hemera'],
  'feathers': ['@nestjs/core', 'loopback', 'sails'],
  'sails': ['@nestjs/core', 'feathers', '@adonisjs/core'],

  // --- HTTP Clients ---
  'axios': ['ky', 'got', 'node-fetch', 'ofetch', 'undici', 'superagent'],
  'ky': ['axios', 'got', 'ofetch', 'undici', 'node-fetch'],
  'got': ['axios', 'ky', 'node-fetch', 'undici', 'ofetch', 'superagent'],
  'node-fetch': ['axios', 'ky', 'got', 'undici', 'ofetch'],
  'ofetch': ['axios', 'ky', 'got', 'node-fetch', 'undici'],
  'undici': ['axios', 'got', 'node-fetch', 'ofetch', 'ky'],
  'superagent': ['axios', 'got', 'ky', 'node-fetch'],
  'needle': ['axios', 'got', 'node-fetch', 'superagent'],
  'cross-fetch': ['node-fetch', 'isomorphic-fetch', 'ofetch'],
  'isomorphic-fetch': ['cross-fetch', 'node-fetch', 'ofetch'],
  'wretch': ['axios', 'ky', 'ofetch'],
  'redaxios': ['axios', 'ky', 'ofetch'],

  // --- Utilities ---
  'lodash': ['ramda', 'remeda', 'radash', 'underscore', 'lodash-es'],
  'lodash-es': ['lodash', 'ramda', 'remeda', 'radash'],
  'ramda': ['lodash', 'remeda', 'radash'],
  'remeda': ['lodash', 'ramda', 'radash'],
  'radash': ['lodash', 'ramda', 'remeda'],
  'underscore': ['lodash', 'ramda', 'remeda'],
  'just-debounce-it': ['lodash.debounce', 'throttle-debounce'],
  'throttle-debounce': ['lodash.debounce', 'just-debounce-it'],
  'deepmerge': ['lodash.merge', 'deepmerge-ts', 'merge-deep'],
  'deepmerge-ts': ['deepmerge', 'lodash.merge', 'ts-deepmerge'],
  'fast-deep-equal': ['deep-equal', 'lodash.isequal', 'dequal'],
  'dequal': ['fast-deep-equal', 'deep-equal', 'lodash.isequal'],
  'deep-equal': ['fast-deep-equal', 'dequal', 'lodash.isequal'],
  'rfdc': ['structuredClone', 'lodash.clonedeep', 'fast-copy'],
  'fast-copy': ['rfdc', 'lodash.clonedeep'],
  'immer': ['mutative', 'immutable', 'structura'],
  'mutative': ['immer', 'immutable'],
  'immutable': ['immer', 'mutative', 'seamless-immutable'],

  // --- Date / Time Libraries ---
  'dayjs': ['date-fns', 'moment', 'luxon', '@formkit/tempo', 'js-joda'],
  'date-fns': ['dayjs', 'moment', 'luxon', '@formkit/tempo', 'js-joda'],
  'moment': ['dayjs', 'date-fns', 'luxon', '@formkit/tempo'],
  'luxon': ['dayjs', 'date-fns', 'moment', '@formkit/tempo'],
  '@formkit/tempo': ['dayjs', 'date-fns', 'luxon', 'moment'],
  'js-joda': ['dayjs', 'date-fns', 'luxon'],
  'moment-timezone': ['luxon', 'date-fns-tz', 'dayjs'],
  'date-fns-tz': ['moment-timezone', 'luxon', 'dayjs'],
  'ms': ['pretty-ms', 'human-interval', 'timeago.js'],
  'pretty-ms': ['ms', 'human-interval'],
  'timeago.js': ['date-fns', 'dayjs', 'moment'],

  // --- Validation ---
  'zod': ['yup', 'joi', 'valibot', 'arktype', 'superstruct', 'typebox', 'io-ts'],
  'yup': ['zod', 'joi', 'valibot', 'superstruct', 'arktype'],
  'joi': ['zod', 'yup', 'valibot', 'superstruct', 'ajv'],
  'valibot': ['zod', 'yup', 'joi', 'arktype', 'superstruct', 'typebox'],
  'arktype': ['zod', 'valibot', 'typebox', 'io-ts'],
  'superstruct': ['zod', 'yup', 'joi', 'valibot'],
  '@sinclair/typebox': ['zod', 'valibot', 'arktype', 'ajv', 'io-ts'],
  'io-ts': ['zod', 'valibot', 'arktype', '@sinclair/typebox'],
  'ajv': ['joi', 'zod', '@sinclair/typebox', 'json-schema-to-ts'],
  'class-validator': ['zod', 'yup', 'joi', 'class-transformer'],
  'class-transformer': ['class-validator', 'zod'],
  'fastest-validator': ['ajv', 'joi', 'zod'],
  'ow': ['zod', 'superstruct', 'runtypes'],
  'runtypes': ['zod', 'io-ts', 'superstruct'],

  // --- CSS / Styling ---
  'tailwindcss': ['unocss', 'windicss', 'tachyons', 'bootstrap'],
  'unocss': ['tailwindcss', 'windicss', 'tachyons'],
  'windicss': ['tailwindcss', 'unocss'],
  'styled-components': ['@emotion/styled', 'vanilla-extract', 'linaria', 'goober', 'stitches'],
  '@emotion/react': ['styled-components', 'vanilla-extract', 'linaria', 'goober'],
  '@emotion/styled': ['styled-components', 'vanilla-extract', 'linaria', 'goober'],
  '@vanilla-extract/css': ['styled-components', '@emotion/styled', 'linaria', '@pandacss/dev'],
  'linaria': ['styled-components', '@emotion/styled', '@vanilla-extract/css'],
  'goober': ['styled-components', '@emotion/styled', 'linaria'],
  '@pandacss/dev': ['tailwindcss', 'unocss', '@vanilla-extract/css', 'styled-components'],
  'sass': ['less', 'postcss', 'stylus'],
  'less': ['sass', 'postcss', 'stylus'],
  'stylus': ['sass', 'less', 'postcss'],
  'postcss': ['sass', 'less', 'lightningcss'],
  'lightningcss': ['postcss', 'cssnano', 'autoprefixer'],
  'cssnano': ['lightningcss', 'postcss', 'clean-css'],
  'clean-css': ['cssnano', 'lightningcss'],
  'autoprefixer': ['lightningcss', 'postcss'],
  'bootstrap': ['tailwindcss', 'bulma', 'foundation-sites'],
  'bulma': ['bootstrap', 'tailwindcss', 'foundation-sites'],
  'normalize.css': ['modern-normalize', 'sanitize.css'],
  'modern-normalize': ['normalize.css', 'sanitize.css'],
  'classnames': ['clsx', 'class-variance-authority'],
  'clsx': ['classnames', 'class-variance-authority'],
  'class-variance-authority': ['clsx', 'classnames', 'tailwind-merge'],
  'tailwind-merge': ['clsx', 'class-variance-authority'],

  // --- Bundlers / Build Tools ---
  'vite': ['webpack', 'esbuild', 'rollup', 'parcel', 'rspack', 'turbopack', 'farm'],
  'webpack': ['vite', 'esbuild', 'rollup', 'parcel', 'rspack', 'turbopack'],
  'esbuild': ['vite', 'webpack', 'rollup', 'swc', 'tsup', 'bun'],
  'rollup': ['vite', 'webpack', 'esbuild', 'parcel', 'rolldown'],
  'parcel': ['vite', 'webpack', 'esbuild', 'rollup'],
  'rspack': ['webpack', 'vite', 'turbopack', 'farm'],
  'turbopack': ['vite', 'webpack', 'rspack', 'farm'],
  '@swc/core': ['esbuild', 'babel', 'typescript'],
  'tsup': ['unbuild', 'esbuild', 'rollup', 'pkgroll'],
  'unbuild': ['tsup', 'esbuild', 'rollup', 'pkgroll'],
  'pkgroll': ['tsup', 'unbuild', 'esbuild'],
  'microbundle': ['tsup', 'unbuild', 'esbuild'],
  'babel': ['@swc/core', 'esbuild', 'typescript'],
  '@babel/core': ['@swc/core', 'esbuild', 'typescript'],
  'typescript': ['@swc/core', 'esbuild', 'babel'],
  'terser': ['esbuild', 'uglify-js', 'swc'],
  'uglify-js': ['terser', 'esbuild'],

  // --- Testing ---
  'jest': ['vitest', 'mocha', 'ava', 'tap', 'node:test'],
  'vitest': ['jest', 'mocha', 'ava', 'tap'],
  'mocha': ['jest', 'vitest', 'ava', 'tap'],
  'ava': ['jest', 'vitest', 'mocha', 'tap'],
  'tap': ['jest', 'vitest', 'mocha', 'ava'],
  'playwright': ['cypress', 'puppeteer', 'selenium-webdriver', 'webdriverio'],
  'cypress': ['playwright', 'puppeteer', 'selenium-webdriver', 'webdriverio'],
  'puppeteer': ['playwright', 'cypress', 'selenium-webdriver'],
  'selenium-webdriver': ['playwright', 'cypress', 'puppeteer', 'webdriverio'],
  'webdriverio': ['playwright', 'cypress', 'selenium-webdriver'],
  '@testing-library/react': ['@testing-library/vue', 'enzyme', '@testing-library/svelte'],
  '@testing-library/vue': ['@testing-library/react', '@testing-library/svelte'],
  'enzyme': ['@testing-library/react', '@testing-library/dom'],
  'chai': ['expect.js', 'should', 'power-assert', 'jest'],
  'sinon': ['jest', 'vitest', 'testdouble'],
  'nock': ['msw', 'fetch-mock', 'polly-js'],
  'msw': ['nock', 'fetch-mock', 'miragejs'],
  'fetch-mock': ['msw', 'nock'],
  'miragejs': ['msw', 'json-server', 'nock'],
  'json-server': ['miragejs', 'msw', 'prism'],
  'supertest': ['light-my-request', 'pactum', 'frisby'],
  'light-my-request': ['supertest', 'pactum'],
  'c8': ['nyc', 'istanbul', 'v8-to-istanbul'],
  'nyc': ['c8', 'istanbul'],
  'storybook': ['ladle', 'histoire', 'react-cosmos', 'chromatic'],
  'ladle': ['storybook', 'histoire'],
  'histoire': ['storybook', 'ladle'],
  'faker': ['@faker-js/faker', 'chance', 'casual'],
  '@faker-js/faker': ['chance', 'casual', 'falso'],
  'chance': ['@faker-js/faker', 'casual', 'falso'],

  // --- ORM / Database ---
  'prisma': ['drizzle-orm', 'typeorm', 'sequelize', 'knex', 'kysely', 'mikro-orm'],
  'drizzle-orm': ['prisma', 'typeorm', 'sequelize', 'knex', 'kysely'],
  'typeorm': ['prisma', 'drizzle-orm', 'sequelize', 'knex', 'mikro-orm'],
  'sequelize': ['prisma', 'drizzle-orm', 'typeorm', 'knex', 'bookshelf'],
  'knex': ['prisma', 'drizzle-orm', 'kysely', 'sequelize', 'slonik'],
  'kysely': ['knex', 'drizzle-orm', 'prisma', 'slonik'],
  'mikro-orm': ['prisma', 'typeorm', 'drizzle-orm', 'sequelize'],
  'mongoose': ['prisma', 'typeorm', 'mongodb', 'mongoist', 'papr'],
  'mongodb': ['mongoose', 'prisma', 'papr'],
  'bookshelf': ['sequelize', 'knex', 'objection'],
  'objection': ['knex', 'bookshelf', 'prisma'],
  'slonik': ['knex', 'kysely', 'pg', 'postgres'],
  'better-sqlite3': ['sql.js', 'sqlite3', 'bun:sqlite'],
  'sqlite3': ['better-sqlite3', 'sql.js'],
  'sql.js': ['better-sqlite3', 'sqlite3'],

  // --- DB Drivers ---
  'pg': ['postgres', 'slonik', 'pg-promise'],
  'postgres': ['pg', 'slonik', 'pg-promise'],
  'pg-promise': ['pg', 'postgres', 'slonik'],
  'mysql2': ['mysql', 'mariadb', 'planetscale'],
  'mysql': ['mysql2', 'mariadb'],
  'ioredis': ['redis', '@upstash/redis'],
  'redis': ['ioredis', '@upstash/redis'],
  '@upstash/redis': ['ioredis', 'redis'],
  '@neondatabase/serverless': ['postgres', 'pg', '@planetscale/database'],
  '@planetscale/database': ['mysql2', '@neondatabase/serverless'],
  '@libsql/client': ['better-sqlite3', 'sql.js', 'sqlite3'],

  // --- State Management ---
  'redux': ['zustand', 'jotai', 'mobx', 'recoil', 'valtio', '@reduxjs/toolkit', 'xstate'],
  '@reduxjs/toolkit': ['zustand', 'jotai', 'mobx', 'valtio', 'redux'],
  'zustand': ['redux', 'jotai', 'mobx', 'recoil', 'valtio', '@reduxjs/toolkit'],
  'jotai': ['zustand', 'redux', 'recoil', 'valtio', 'nanostores'],
  'mobx': ['redux', 'zustand', 'jotai', 'valtio'],
  'recoil': ['jotai', 'zustand', 'redux', 'valtio'],
  'valtio': ['zustand', 'jotai', 'mobx', 'redux'],
  'xstate': ['zustand', 'redux', 'robot3', 'stately'],
  'pinia': ['vuex', 'zustand', 'jotai'],
  'vuex': ['pinia', 'zustand'],
  'nanostores': ['jotai', 'zustand', 'valtio'],
  'effector': ['mobx', 'redux', 'zustand'],
  '@preact/signals-react': ['jotai', 'zustand', 'valtio'],
  'legend-state': ['zustand', 'jotai', 'valtio', 'mobx'],

  // --- Data Fetching ---
  '@tanstack/react-query': ['swr', '@apollo/client', 'urql', 'relay-runtime'],
  'swr': ['@tanstack/react-query', '@apollo/client', 'urql'],
  '@apollo/client': ['urql', '@tanstack/react-query', 'swr', 'relay-runtime', 'graphql-request'],
  'urql': ['@apollo/client', '@tanstack/react-query', 'graphql-request'],
  'relay-runtime': ['@apollo/client', 'urql', '@tanstack/react-query'],
  'graphql-request': ['@apollo/client', 'urql', 'relay-runtime'],
  'graphql': ['type-graphql', 'nexus', 'pothos'],
  '@trpc/client': ['@trpc/server', 'graphql-request', '@tanstack/react-query'],
  '@trpc/server': ['@trpc/client', 'graphql', 'type-graphql'],

  // --- Forms ---
  'react-hook-form': ['formik', '@tanstack/react-form', 'react-final-form'],
  'formik': ['react-hook-form', '@tanstack/react-form', 'react-final-form'],
  '@tanstack/react-form': ['react-hook-form', 'formik', 'react-final-form'],
  'react-final-form': ['react-hook-form', 'formik', '@tanstack/react-form'],
  'vee-validate': ['formkit', 'vuelidate'],
  'formkit': ['vee-validate', 'vuelidate'],
  'vuelidate': ['vee-validate', 'formkit'],

  // --- Routing ---
  'react-router': ['@tanstack/react-router', 'wouter', 'react-router-dom'],
  'react-router-dom': ['@tanstack/react-router', 'wouter', 'react-router'],
  '@tanstack/react-router': ['react-router', 'wouter', 'react-router-dom'],
  'wouter': ['react-router', '@tanstack/react-router'],
  'vue-router': ['react-router', '@tanstack/react-router'],

  // --- CLI Tools ---
  'chalk': ['picocolors', 'colorette', 'kleur', 'ansi-colors', 'kolorist'],
  'picocolors': ['chalk', 'colorette', 'kleur', 'kolorist'],
  'colorette': ['chalk', 'picocolors', 'kleur'],
  'kleur': ['chalk', 'picocolors', 'colorette'],
  'ansi-colors': ['chalk', 'picocolors', 'kleur'],
  'kolorist': ['chalk', 'picocolors', 'colorette'],
  'commander': ['yargs', 'cac', 'meow', 'citty', 'clipanion', 'oclif'],
  'yargs': ['commander', 'cac', 'meow', 'citty', 'clipanion'],
  'cac': ['commander', 'yargs', 'meow', 'citty'],
  'meow': ['commander', 'yargs', 'cac', 'citty'],
  'citty': ['commander', 'yargs', 'cac', 'meow'],
  'clipanion': ['commander', 'yargs', 'oclif'],
  'oclif': ['commander', 'yargs', 'clipanion', 'ink'],
  'inquirer': ['prompts', 'enquirer', '@clack/prompts', 'readline'],
  'prompts': ['inquirer', 'enquirer', '@clack/prompts'],
  'enquirer': ['inquirer', 'prompts', '@clack/prompts'],
  '@clack/prompts': ['inquirer', 'prompts', 'enquirer'],
  'ora': ['nanospinner', 'cli-spinners', 'log-update'],
  'nanospinner': ['ora', 'cli-spinners'],
  'cli-progress': ['ora', 'progress', 'cli-progress-bar'],
  'boxen': ['terminal-kit', 'cli-box'],
  'listr2': ['ora', 'tasuku', 'p-queue'],
  'ink': ['blessed', 'terminal-kit', 'oclif'],
  'blessed': ['ink', 'terminal-kit'],
  'terminal-kit': ['ink', 'blessed'],
  'figures': ['log-symbols', 'ora'],
  'log-symbols': ['figures', 'ora', 'chalk'],
  'shelljs': ['execa', 'zx'],
  'execa': ['shelljs', 'zx', 'cross-spawn', 'nano-spawn'],
  'zx': ['execa', 'shelljs', 'cross-spawn'],
  'cross-spawn': ['execa', 'shelljs'],
  'nano-spawn': ['execa', 'cross-spawn', 'zx'],
  'globby': ['fast-glob', 'glob', 'tinyglobby'],
  'fast-glob': ['globby', 'glob', 'tinyglobby'],
  'glob': ['globby', 'fast-glob', 'tinyglobby'],
  'tinyglobby': ['globby', 'fast-glob', 'glob'],

  // --- Auth ---
  'passport': ['lucia', 'next-auth', 'grant'],
  'lucia': ['passport', 'next-auth', 'arctic'],
  'next-auth': ['passport', 'lucia', '@auth/core'],
  '@auth/core': ['next-auth', 'lucia', 'passport'],
  'arctic': ['lucia', 'passport', 'next-auth'],
  'jsonwebtoken': ['jose', 'paseto', 'jwt-decode'],
  'jose': ['jsonwebtoken', 'paseto', 'jwt-decode'],
  'jwt-decode': ['jsonwebtoken', 'jose'],
  'bcrypt': ['bcryptjs', 'argon2', 'scrypt-js'],
  'bcryptjs': ['bcrypt', 'argon2', 'scrypt-js'],
  'argon2': ['bcrypt', 'bcryptjs', 'scrypt-js'],
  '@simplewebauthn/server': ['fido2-lib', 'webauthn'],
  'speakeasy': ['otplib', 'notp'],
  'otplib': ['speakeasy', 'notp'],
  'helmet': ['hpp', 'cors', 'csurf'],
  'cors': ['helmet', '@fastify/cors'],
  'csurf': ['csrf-csrf', 'helmet'],

  // --- Logging ---
  'winston': ['pino', 'bunyan', 'consola', 'tslog', 'log4js', 'signale'],
  'pino': ['winston', 'bunyan', 'consola', 'tslog', 'log4js'],
  'bunyan': ['winston', 'pino', 'consola', 'log4js'],
  'consola': ['winston', 'pino', 'tslog', 'signale'],
  'tslog': ['winston', 'pino', 'consola'],
  'log4js': ['winston', 'pino', 'bunyan'],
  'signale': ['winston', 'consola', 'pino'],
  'debug': ['consola', 'pino', 'winston'],
  'loglevel': ['debug', 'consola', 'winston'],

  // --- Queues / Jobs ---
  'bull': ['bullmq', 'bee-queue', 'agenda', 'pg-boss'],
  'bullmq': ['bull', 'bee-queue', 'agenda', 'pg-boss'],
  'bee-queue': ['bull', 'bullmq', 'agenda'],
  'agenda': ['bull', 'bullmq', 'pg-boss', 'bree'],
  'pg-boss': ['bull', 'bullmq', 'agenda'],
  'bree': ['agenda', 'node-cron', 'cron'],
  'node-cron': ['cron', 'bree', 'agenda'],
  'cron': ['node-cron', 'bree', 'agenda'],
  'p-queue': ['fastq', 'better-queue', 'queue'],
  'fastq': ['p-queue', 'better-queue'],

  // --- ID Generation ---
  'uuid': ['nanoid', 'cuid2', 'ulid', 'short-uuid', 'hyperid'],
  'nanoid': ['uuid', 'cuid2', 'ulid', 'short-uuid', 'hyperid'],
  'cuid2': ['uuid', 'nanoid', 'ulid'],
  'ulid': ['uuid', 'nanoid', 'cuid2'],
  'short-uuid': ['uuid', 'nanoid', 'hyperid'],
  'hyperid': ['uuid', 'nanoid', 'short-uuid'],

  // --- Animation ---
  'framer-motion': ['gsap', 'animejs', 'react-spring', 'motion', '@formkit/auto-animate'],
  'gsap': ['framer-motion', 'animejs', 'velocity-animate', 'motion'],
  'animejs': ['gsap', 'framer-motion', 'motion', 'popmotion'],
  'react-spring': ['framer-motion', 'react-move', '@react-spring/web', 'motion'],
  'motion': ['framer-motion', 'gsap', 'animejs', 'react-spring'],
  '@formkit/auto-animate': ['framer-motion', 'motion', 'animejs'],
  'popmotion': ['framer-motion', 'gsap', 'animejs'],
  'lottie-web': ['rive-js', 'bodymovin', 'gsap'],
  '@rive-app/canvas': ['lottie-web', 'gsap'],
  'velocity-animate': ['gsap', 'animejs'],

  // --- Charts / Data Visualization ---
  'd3': ['chart.js', 'recharts', '@nivo/core', '@visx/visx', 'apexcharts', 'echarts'],
  'chart.js': ['d3', 'recharts', 'apexcharts', 'echarts', 'highcharts'],
  'recharts': ['chart.js', 'd3', '@nivo/core', '@visx/visx', 'victory'],
  '@nivo/core': ['recharts', 'd3', '@visx/visx', 'chart.js'],
  '@visx/visx': ['d3', 'recharts', '@nivo/core', 'victory'],
  'apexcharts': ['chart.js', 'echarts', 'highcharts', 'plotly.js'],
  'echarts': ['chart.js', 'apexcharts', 'd3', 'highcharts'],
  'highcharts': ['chart.js', 'apexcharts', 'echarts', 'plotly.js'],
  'plotly.js': ['chart.js', 'highcharts', 'echarts', 'apexcharts'],
  'victory': ['recharts', '@nivo/core', '@visx/visx'],
  'lightweight-charts': ['chart.js', 'echarts', 'apexcharts'],

  // --- Image Processing ---
  'sharp': ['jimp', '@napi-rs/image', 'canvas', 'gm'],
  'jimp': ['sharp', 'canvas', 'gm'],
  'canvas': ['sharp', 'jimp', '@napi-rs/canvas', 'skia-canvas'],
  '@napi-rs/canvas': ['canvas', 'sharp', 'skia-canvas'],
  'gm': ['sharp', 'jimp'],
  'pica': ['sharp', 'jimp', 'browser-image-compression'],
  'browser-image-compression': ['pica', 'compressorjs'],
  'compressorjs': ['browser-image-compression', 'pica'],
  'blurhash': ['thumbhash', 'plaiceholder'],
  'thumbhash': ['blurhash', 'plaiceholder'],

  // --- Markdown ---
  'marked': ['markdown-it', 'remark', 'micromark', 'showdown', 'commonmark'],
  'markdown-it': ['marked', 'remark', 'micromark', 'showdown'],
  'remark': ['marked', 'markdown-it', 'micromark', 'rehype', 'unified'],
  'rehype': ['remark', 'unified', 'hast'],
  'unified': ['remark', 'rehype', 'micromark'],
  'micromark': ['marked', 'markdown-it', 'remark'],
  'showdown': ['marked', 'markdown-it', 'commonmark'],
  'commonmark': ['marked', 'markdown-it', 'showdown'],
  '@mdx-js/mdx': ['remark', 'next-mdx-remote', 'mdx-bundler'],
  'next-mdx-remote': ['@mdx-js/mdx', 'mdx-bundler', 'contentlayer'],
  'mdx-bundler': ['@mdx-js/mdx', 'next-mdx-remote'],
  'gray-matter': ['front-matter', 'yaml'],
  'front-matter': ['gray-matter', 'yaml'],

  // --- Email ---
  'nodemailer': ['resend', '@sendgrid/mail', 'postmark', 'mailgun.js'],
  'resend': ['nodemailer', '@sendgrid/mail', 'postmark'],
  '@sendgrid/mail': ['nodemailer', 'resend', 'postmark', 'mailgun.js'],
  'postmark': ['nodemailer', 'resend', '@sendgrid/mail'],
  'mailgun.js': ['nodemailer', '@sendgrid/mail', 'postmark', 'resend'],
  '@react-email/components': ['mjml', 'mailing', 'email-templates'],
  'mjml': ['@react-email/components', 'email-templates'],
  'email-templates': ['nodemailer', '@react-email/components', 'mjml'],

  // --- WebSocket ---
  'socket.io': ['ws', 'uWebSockets.js', 'sockjs', 'primus', '@fastify/websocket'],
  'ws': ['socket.io', 'uWebSockets.js', 'faye-websocket', '@fastify/websocket'],
  'faye-websocket': ['ws', 'socket.io'],
  'sockjs': ['socket.io', 'ws', 'primus'],
  'primus': ['socket.io', 'ws', 'sockjs'],
  '@fastify/websocket': ['ws', 'socket.io'],
  'pusher-js': ['ably', 'socket.io', '@supabase/realtime-js'],
  'ably': ['pusher-js', 'socket.io', '@supabase/realtime-js'],

  // --- Monorepo Tools ---
  'turbo': ['nx', 'lerna', 'moon', '@microsoft/rush'],
  'nx': ['turbo', 'lerna', 'moon', '@microsoft/rush'],
  'lerna': ['turbo', 'nx', 'moon', '@microsoft/rush'],
  'moon': ['turbo', 'nx', 'lerna'],
  '@microsoft/rush': ['turbo', 'nx', 'lerna'],
  '@changesets/cli': ['semantic-release', 'lerna', 'release-it'],
  'semantic-release': ['@changesets/cli', 'release-it', 'standard-version'],
  'release-it': ['semantic-release', '@changesets/cli', 'standard-version'],
  'standard-version': ['semantic-release', 'release-it', '@changesets/cli'],

  // --- Type Utilities ---
  'ts-pattern': ['ts-results', 'fp-ts', 'effect'],
  'type-fest': ['ts-essentials', 'utility-types', 'ts-toolbelt'],
  'ts-essentials': ['type-fest', 'utility-types', 'ts-toolbelt'],
  'utility-types': ['type-fest', 'ts-essentials', 'ts-toolbelt'],
  'ts-toolbelt': ['type-fest', 'ts-essentials', 'utility-types'],
  'effect': ['fp-ts', 'neverthrow', 'ts-pattern'],
  'fp-ts': ['effect', 'neverthrow', 'purify-ts'],
  'neverthrow': ['effect', 'fp-ts', 'true-myth'],
  'purify-ts': ['fp-ts', 'effect', 'neverthrow'],
  'true-myth': ['neverthrow', 'fp-ts', 'purify-ts'],

  // --- UI Component Libraries ---
  '@radix-ui/react-dialog': ['@headlessui/react', '@ark-ui/react', '@base-ui/react'],
  '@headlessui/react': ['@radix-ui/react-dialog', '@ark-ui/react', 'react-aria'],
  'react-aria': ['@headlessui/react', '@radix-ui/react-dialog', '@ark-ui/react'],
  '@ark-ui/react': ['@radix-ui/react-dialog', '@headlessui/react', 'react-aria'],
  '@chakra-ui/react': ['@mantine/core', '@mui/material', 'antd', '@nextui-org/react'],
  '@mantine/core': ['@chakra-ui/react', '@mui/material', 'antd', '@nextui-org/react'],
  '@mui/material': ['@chakra-ui/react', '@mantine/core', 'antd', '@nextui-org/react'],
  'antd': ['@mui/material', '@chakra-ui/react', '@mantine/core', 'element-plus'],
  '@nextui-org/react': ['@chakra-ui/react', '@mantine/core', '@mui/material'],
  'element-plus': ['antd', 'vuetify', 'naive-ui', 'primevue'],
  'vuetify': ['element-plus', 'naive-ui', 'primevue', 'quasar'],
  'naive-ui': ['element-plus', 'vuetify', 'primevue'],
  'primevue': ['element-plus', 'vuetify', 'naive-ui', 'quasar'],
  'quasar': ['vuetify', 'element-plus', 'primevue'],
  'flowbite': ['daisyui', 'tailwindcss', 'shadcn-ui'],
  'daisyui': ['flowbite', 'tailwindcss', 'shadcn-ui'],
  '@tremor/react': ['@shadcn/ui', '@mantine/core', 'recharts'],
  'react-select': ['@radix-ui/react-select', 'downshift', 'react-dropdown-select'],
  'downshift': ['react-select', '@radix-ui/react-select', 'cmdk'],
  'cmdk': ['downshift', '@radix-ui/react-combobox'],
  'react-table': ['@tanstack/react-table', 'ag-grid-react'],
  '@tanstack/react-table': ['ag-grid-react', 'react-table', 'react-data-grid'],
  'ag-grid-react': ['@tanstack/react-table', 'react-data-grid'],
  'react-data-grid': ['@tanstack/react-table', 'ag-grid-react'],
  'react-virtualized': ['@tanstack/react-virtual', 'react-window', 'react-virtuoso'],
  'react-window': ['@tanstack/react-virtual', 'react-virtualized', 'react-virtuoso'],
  '@tanstack/react-virtual': ['react-window', 'react-virtualized', 'react-virtuoso'],
  'react-virtuoso': ['@tanstack/react-virtual', 'react-window', 'react-virtualized'],
  'react-tooltip': ['@floating-ui/react', 'tippy.js', 'react-popper'],
  '@floating-ui/react': ['react-tooltip', 'tippy.js', 'react-popper', '@popperjs/core'],
  'tippy.js': ['@floating-ui/react', 'react-tooltip', '@popperjs/core'],
  '@popperjs/core': ['@floating-ui/dom', 'tippy.js'],
  '@floating-ui/dom': ['@popperjs/core', 'tippy.js'],
  'react-modal': ['@radix-ui/react-dialog', '@headlessui/react', 'react-responsive-modal'],
  'react-datepicker': ['react-day-picker', '@mui/x-date-pickers', 'flatpickr'],
  'react-day-picker': ['react-datepicker', '@mui/x-date-pickers'],
  'flatpickr': ['react-datepicker', 'pikaday'],
  'react-dnd': ['@dnd-kit/core', 'react-beautiful-dnd', 'react-sortable-hoc'],
  '@dnd-kit/core': ['react-dnd', 'react-beautiful-dnd', 'pragmatic-drag-and-drop'],
  'react-beautiful-dnd': ['@dnd-kit/core', 'react-dnd', 'pragmatic-drag-and-drop'],
  'pragmatic-drag-and-drop': ['@dnd-kit/core', 'react-dnd', 'react-beautiful-dnd'],
  'sortablejs': ['@dnd-kit/core', 'react-beautiful-dnd', 'draggable'],
  'swiper': ['keen-slider', 'embla-carousel', 'splide', 'flickity', 'slick-carousel'],
  'keen-slider': ['swiper', 'embla-carousel', 'splide'],
  'embla-carousel': ['swiper', 'keen-slider', 'splide'],
  'splide': ['swiper', 'keen-slider', 'embla-carousel'],
  'slick-carousel': ['swiper', 'keen-slider', 'embla-carousel'],

  // --- i18n ---
  'i18next': ['react-intl', '@lingui/core', 'vue-i18n', 'rosetta', 'typesafe-i18n'],
  'react-intl': ['i18next', '@lingui/core', 'react-i18next'],
  'react-i18next': ['react-intl', '@lingui/react', 'i18next'],
  '@lingui/core': ['i18next', 'react-intl', 'typesafe-i18n'],
  '@lingui/react': ['react-i18next', 'react-intl'],
  'vue-i18n': ['i18next', '@lingui/core'],
  'typesafe-i18n': ['i18next', '@lingui/core', 'paraglide-js'],
  'rosetta': ['i18next', 'typesafe-i18n'],

  // --- File Upload / Multipart ---
  'multer': ['busboy', 'formidable', 'multiparty', '@fastify/multipart'],
  'busboy': ['multer', 'formidable', 'multiparty'],
  'formidable': ['multer', 'busboy', 'multiparty'],
  'multiparty': ['multer', 'busboy', 'formidable'],
  '@fastify/multipart': ['multer', 'busboy'],
  'tus-js-client': ['uppy', 'filepond', 'resumable.js'],
  'uppy': ['filepond', 'dropzone', 'tus-js-client'],
  'filepond': ['uppy', 'dropzone', 'tus-js-client'],
  'dropzone': ['uppy', 'filepond', 'react-dropzone'],
  'react-dropzone': ['dropzone', 'uppy', 'filepond'],

  // --- Rate Limiting ---
  'express-rate-limit': ['rate-limiter-flexible', '@fastify/rate-limit', 'bottleneck'],
  'rate-limiter-flexible': ['express-rate-limit', 'bottleneck', '@fastify/rate-limit'],
  'bottleneck': ['p-limit', 'rate-limiter-flexible', 'express-rate-limit'],
  'p-limit': ['bottleneck', 'p-queue', 'async-sema'],
  'async-sema': ['p-limit', 'bottleneck'],
  '@fastify/rate-limit': ['express-rate-limit', 'rate-limiter-flexible'],

  // --- Caching ---
  'node-cache': ['keyv', 'lru-cache', 'cache-manager'],
  'keyv': ['node-cache', 'cache-manager', 'lru-cache'],
  'lru-cache': ['node-cache', 'quick-lru', 'keyv'],
  'quick-lru': ['lru-cache', 'keyv'],
  'cache-manager': ['keyv', 'node-cache', 'catbox'],
  'catbox': ['cache-manager', 'keyv'],

  // --- Config / Env ---
  'dotenv': ['env-cmd', 'dotenvx', '@t3-oss/env-core'],
  'env-cmd': ['dotenv', 'cross-env', 'dotenvx'],
  'dotenvx': ['dotenv', 'env-cmd'],
  'cross-env': ['env-cmd', 'dotenv'],
  'cosmiconfig': ['lilconfig', 'rc', 'c12'],
  'lilconfig': ['cosmiconfig', 'rc', 'c12'],
  'c12': ['cosmiconfig', 'lilconfig', 'unconfig'],
  'unconfig': ['c12', 'cosmiconfig', 'lilconfig'],
  'rc': ['cosmiconfig', 'lilconfig'],
  'convict': ['cosmiconfig', 'conf', 'envalid'],
  'conf': ['convict', 'configstore', 'cosmiconfig'],
  'envalid': ['dotenv', 'env-var', '@t3-oss/env-core'],
  'env-var': ['envalid', 'dotenv'],
  '@t3-oss/env-core': ['envalid', 'dotenv', 'env-var'],

  // --- PDF ---
  'pdfkit': ['jspdf', 'pdf-lib', '@react-pdf/renderer'],
  'jspdf': ['pdfkit', 'pdf-lib', '@react-pdf/renderer'],
  'pdf-lib': ['pdfkit', 'jspdf', '@react-pdf/renderer'],
  '@react-pdf/renderer': ['pdfkit', 'jspdf', 'pdf-lib'],
  'pdfjs-dist': ['pdf2pic', 'pdf-parse', 'pdf-lib'],
  'pdf-parse': ['pdfjs-dist', 'pdf-lib'],

  // --- Rich Text Editors ---
  '@tiptap/core': ['prosemirror-state', 'slate', 'lexical', 'quill'],
  'prosemirror-state': ['@tiptap/core', 'slate', 'lexical', 'quill'],
  'slate': ['@tiptap/core', 'prosemirror-state', 'lexical', 'quill', 'draft-js'],
  'lexical': ['@tiptap/core', 'slate', 'prosemirror-state', 'quill'],
  'quill': ['@tiptap/core', 'slate', 'lexical', 'draft-js', 'prosemirror-state'],
  'draft-js': ['slate', 'lexical', '@tiptap/core', 'quill'],
  'monaco-editor': ['codemirror', 'ace-builds'],
  'codemirror': ['monaco-editor', 'ace-builds'],
  'ace-builds': ['monaco-editor', 'codemirror'],

  // --- Schema / JSON ---
  'json-schema-to-ts': ['ajv', '@sinclair/typebox', 'zod-to-json-schema'],
  'zod-to-json-schema': ['json-schema-to-ts', 'ajv', '@sinclair/typebox'],

  // --- Crypto / Hashing ---
  'crypto-js': ['tweetnacl', 'noble-hashes', '@noble/hashes'],
  '@noble/hashes': ['crypto-js', 'hash-wasm', 'tweetnacl'],
  'hash-wasm': ['@noble/hashes', 'crypto-js'],
  'tweetnacl': ['@noble/curves', 'crypto-js', 'libsodium-wrappers'],
  'libsodium-wrappers': ['tweetnacl', '@noble/curves'],

  // --- File System ---
  'fs-extra': ['graceful-fs', 'proper-lockfile', 'memfs'],
  'graceful-fs': ['fs-extra', 'memfs'],
  'chokidar': ['watchpack', 'fb-watchman', 'nsfw', 'parcel-watcher'],
  'watchpack': ['chokidar', 'nsfw', 'parcel-watcher'],
  'parcel-watcher': ['chokidar', 'watchpack', 'nsfw'],
  'tmp': ['tempy', 'tmp-promise'],
  'tempy': ['tmp', 'tmp-promise'],
  'rimraf': ['del', 'fs-extra'],
  'del': ['rimraf', 'fs-extra'],
  'mkdirp': ['make-dir', 'fs-extra'],
  'make-dir': ['mkdirp', 'fs-extra'],
  'pathe': ['path', 'upath', 'slash'],
  'upath': ['pathe', 'slash'],

  // --- Compression ---
  'archiver': ['jszip', 'yazl', 'adm-zip', 'tar'],
  'jszip': ['archiver', 'adm-zip', 'fflate'],
  'adm-zip': ['archiver', 'jszip', 'yazl'],
  'fflate': ['pako', 'zlib', 'jszip'],
  'pako': ['fflate', 'zlib'],
  'tar': ['archiver', 'tar-fs'],
  'tar-fs': ['tar', 'archiver'],

  // --- Templating ---
  'handlebars': ['ejs', 'pug', 'nunjucks', 'mustache', 'eta'],
  'ejs': ['handlebars', 'pug', 'nunjucks', 'mustache', 'eta'],
  'pug': ['ejs', 'handlebars', 'nunjucks'],
  'nunjucks': ['handlebars', 'ejs', 'pug', 'eta'],
  'mustache': ['handlebars', 'ejs', 'eta'],
  'eta': ['ejs', 'handlebars', 'nunjucks', 'mustache'],
  'liquid': ['handlebars', 'nunjucks', 'eta'],

  // --- Serialization / Parsing ---
  'yaml': ['js-yaml', 'toml', 'json5'],
  'js-yaml': ['yaml', 'toml', 'json5'],
  'toml': ['yaml', 'js-yaml', 'json5'],
  'json5': ['yaml', 'js-yaml', 'jsonc-parser'],
  'jsonc-parser': ['json5', 'strip-json-comments'],
  'csv-parse': ['papaparse', 'fast-csv', 'csv-parser'],
  'papaparse': ['csv-parse', 'fast-csv', 'csv-parser', 'd3-dsv'],
  'fast-csv': ['csv-parse', 'papaparse', 'csv-parser'],
  'csv-parser': ['csv-parse', 'papaparse', 'fast-csv'],
  'xml2js': ['fast-xml-parser', 'cheerio', 'htmlparser2'],
  'fast-xml-parser': ['xml2js', 'cheerio', 'htmlparser2'],
  'cheerio': ['jsdom', 'htmlparser2', 'fast-xml-parser', 'linkedom'],
  'jsdom': ['cheerio', 'happy-dom', 'linkedom', 'htmlparser2'],
  'happy-dom': ['jsdom', 'linkedom', 'cheerio'],
  'linkedom': ['jsdom', 'happy-dom', 'cheerio'],
  'htmlparser2': ['cheerio', 'fast-xml-parser', 'parse5'],
  'parse5': ['htmlparser2', 'cheerio'],

  // --- Linting / Formatting ---
  'eslint': ['biome', 'oxlint', 'standard'],
  'biome': ['eslint', 'prettier', 'oxlint', 'dprint'],
  'oxlint': ['eslint', 'biome'],
  'prettier': ['biome', 'dprint', 'eslint'],
  'dprint': ['prettier', 'biome'],
  'stylelint': ['eslint', 'biome'],

  // --- Task Runners / Scripts ---
  'npm-run-all2': ['concurrently', 'wireit'],
  'concurrently': ['npm-run-all2', 'wireit'],
  'wireit': ['npm-run-all2', 'concurrently', 'turbo'],
  'husky': ['simple-git-hooks', 'lefthook', 'lint-staged'],
  'simple-git-hooks': ['husky', 'lefthook'],
  'lefthook': ['husky', 'simple-git-hooks'],
  'lint-staged': ['nano-staged', 'husky'],
  'nano-staged': ['lint-staged', 'husky'],
  'patch-package': ['pnpm', 'yarn'],

  // --- HTTP Middleware / Proxy ---
  'http-proxy-middleware': ['http-proxy', '@fastify/http-proxy', 'express-http-proxy'],
  'http-proxy': ['http-proxy-middleware', '@fastify/http-proxy'],
  'express-http-proxy': ['http-proxy-middleware', 'http-proxy'],
  'compression': ['shrink-ray-current', '@fastify/compress'],
  'serve-static': ['sirv', '@fastify/static'],
  'sirv': ['serve-static', '@fastify/static'],
  'cookie-parser': ['cookie', '@fastify/cookie'],
  'express-session': ['cookie-session', '@fastify/session', 'iron-session'],
  'iron-session': ['express-session', 'cookie-session'],
  'body-parser': ['co-body', '@fastify/formbody'],
  'morgan': ['pino-http', 'express-winston'],
  'pino-http': ['morgan', 'express-winston'],

  // --- Payment ---
  'stripe': ['@paddle/paddle-node-sdk', '@lemonsqueezy/lemonsqueezy.js', 'paypal-rest-sdk'],
  '@paddle/paddle-node-sdk': ['stripe', '@lemonsqueezy/lemonsqueezy.js'],
  '@lemonsqueezy/lemonsqueezy.js': ['stripe', '@paddle/paddle-node-sdk'],

  // --- CMS / Content ---
  'contentful': ['@sanity/client', 'strapi', '@prismicio/client', 'directus'],
  '@sanity/client': ['contentful', 'strapi', '@prismicio/client'],
  'strapi': ['contentful', '@sanity/client', 'directus', 'payload'],
  'directus': ['strapi', 'contentful', 'payload'],
  'payload': ['strapi', 'directus', 'keystone'],
  '@prismicio/client': ['contentful', '@sanity/client'],
  'keystonejs': ['strapi', 'payload', 'directus'],

  // --- Search ---
  'meilisearch': ['typesense', 'algolia', 'lunr', 'minisearch', 'flexsearch'],
  'typesense': ['meilisearch', 'algolia', 'lunr'],
  'algoliasearch': ['meilisearch', 'typesense', 'lunr'],
  'lunr': ['flexsearch', 'minisearch', 'fuse.js'],
  'flexsearch': ['lunr', 'minisearch', 'fuse.js'],
  'minisearch': ['flexsearch', 'lunr', 'fuse.js'],
  'fuse.js': ['flexsearch', 'lunr', 'minisearch'],

  // --- Error Tracking ---
  '@sentry/node': ['@sentry/browser', 'bugsnag', '@datadog/browser-rum', 'logrocket'],
  '@sentry/browser': ['@sentry/node', 'bugsnag', '@datadog/browser-rum'],
  '@bugsnag/js': ['@sentry/node', '@datadog/browser-rum'],
  'logrocket': ['@sentry/browser', '@bugsnag/js'],

  // --- SSR / Streaming ---
  'react-dom': ['preact', 'million', 'solid-js'],
  'million': ['react-dom', 'preact', 'solid-js'],

  // --- String Manipulation ---
  'slugify': ['parameterize', 'url-slug', 'speakingurl'],
  'url-slug': ['slugify', 'speakingurl'],
  'speakingurl': ['slugify', 'url-slug'],
  'change-case': ['camelcase', 'title-case', 'lodash'],
  'camelcase': ['change-case', 'lodash'],
  'pluralize': ['plur'],
  'plur': ['pluralize'],
  'escape-html': ['he', 'html-entities', 'entities'],
  'he': ['escape-html', 'html-entities', 'entities'],
  'html-entities': ['he', 'escape-html', 'entities'],
  'entities': ['he', 'html-entities'],
  'sanitize-html': ['dompurify', 'xss', 'isomorphic-dompurify'],
  'dompurify': ['sanitize-html', 'xss', 'isomorphic-dompurify'],
  'isomorphic-dompurify': ['sanitize-html', 'dompurify', 'xss'],
  'xss': ['sanitize-html', 'dompurify'],
  'validator': ['is-email', 'zod', 'joi'],
  'string-width': ['strip-ansi', 'wrap-ansi'],

  // --- Maps ---
  'leaflet': ['mapbox-gl', '@googlemaps/js-api-loader', 'ol', 'maplibre-gl'],
  'mapbox-gl': ['leaflet', 'maplibre-gl', '@googlemaps/js-api-loader'],
  'maplibre-gl': ['mapbox-gl', 'leaflet', 'ol'],
  'ol': ['leaflet', 'mapbox-gl', 'maplibre-gl'],
  '@googlemaps/js-api-loader': ['leaflet', 'mapbox-gl'],
  'react-map-gl': ['@react-google-maps/api', 'react-leaflet'],
  'react-leaflet': ['react-map-gl', '@react-google-maps/api'],

  // --- Math / Numbers ---
  'big.js': ['bignumber.js', 'decimal.js', 'mathjs', 'dinero.js'],
  'bignumber.js': ['big.js', 'decimal.js', 'bn.js'],
  'decimal.js': ['big.js', 'bignumber.js', 'mathjs'],
  'bn.js': ['bignumber.js', 'big.js'],
  'mathjs': ['numeric', 'decimal.js', 'big.js'],
  'dinero.js': ['currency.js', 'big.js', 'accounting'],
  'currency.js': ['dinero.js', 'big.js', 'accounting'],
  'numeral': ['numbro', 'accounting'],
  'numbro': ['numeral', 'accounting'],
  'accounting': ['dinero.js', 'currency.js', 'numeral'],

  // --- Regex ---
  'escape-string-regexp': ['safe-regex2'],

  // --- Process / System ---
  'dotenv-expand': ['dotenv', 'cross-env'],
  'signal-exit': ['exit-hook'],
  'exit-hook': ['signal-exit'],
  'open': ['opener', 'opn'],
  'clipboardy': ['copy-paste', 'clipboard'],

  // --- Retry / Resilience ---
  'p-retry': ['async-retry', 'retry', 'cockatiel'],
  'async-retry': ['p-retry', 'retry', 'cockatiel'],
  'retry': ['p-retry', 'async-retry'],
  'cockatiel': ['p-retry', 'async-retry', 'opossum'],
  'opossum': ['cockatiel', 'brakes'],

  // --- EventEmitter ---
  'eventemitter3': ['mitt', 'nanoevents', 'emittery'],
  'mitt': ['eventemitter3', 'nanoevents', 'emittery'],
  'nanoevents': ['mitt', 'eventemitter3', 'emittery'],
  'emittery': ['eventemitter3', 'mitt', 'nanoevents'],
  'rxjs': ['most', 'xstream', 'bacon.js', 'observable-fns'],
  'most': ['rxjs', 'xstream', 'bacon.js'],
  'xstream': ['rxjs', 'most'],

  // --- Storage / ORM (Browser) ---
  'dexie': ['idb', 'localforage', 'pouchdb'],
  'idb': ['dexie', 'localforage'],
  'localforage': ['dexie', 'idb', 'pouchdb'],
  'pouchdb': ['dexie', 'localforage', 'rxdb'],
  'rxdb': ['pouchdb', 'dexie'],

  // --- Feature Flags ---
  '@unleash/proxy-client-react': ['launchdarkly-js-client-sdk', '@growthbook/growthbook-react'],
  'launchdarkly-js-client-sdk': ['@unleash/proxy-client-react', '@growthbook/growthbook-react'],
  '@growthbook/growthbook-react': ['launchdarkly-js-client-sdk', '@unleash/proxy-client-react'],

  // --- SSG / Static Tools ---
  'gray-matter-engine': ['contentlayer', '@mdx-js/mdx'],
  'contentlayer': ['next-mdx-remote', '@mdx-js/mdx', 'velite'],
  'velite': ['contentlayer', '@mdx-js/mdx'],

  // --- Cloud SDKs ---
  'aws-sdk': ['@aws-sdk/client-s3', '@google-cloud/storage', 'azure-storage'],
  '@aws-sdk/client-s3': ['@google-cloud/storage', 'minio'],
  '@google-cloud/storage': ['@aws-sdk/client-s3', 'minio'],
  'minio': ['@aws-sdk/client-s3', '@google-cloud/storage'],
  'firebase': ['supabase', '@aws-amplify/core', 'appwrite'],
  'supabase': ['firebase', '@aws-amplify/core', 'appwrite', 'nhost'],
  '@aws-amplify/core': ['firebase', 'supabase'],
  'appwrite': ['firebase', 'supabase', 'nhost'],

  // --- SEO / Meta ---
  'next-seo': ['next-sitemap', '@unhead/vue'],
  '@unhead/vue': ['next-seo', 'react-helmet-async'],
  'react-helmet-async': ['next-seo', '@unhead/vue'],

  // --- Date Picker / Calendar ---
  '@fullcalendar/core': ['tui-calendar', 'react-big-calendar'],
  'react-big-calendar': ['@fullcalendar/core', 'tui-calendar'],

  // --- Diagram ---
  'mermaid': ['d2', 'plantuml', 'markmap'],
  'reactflow': ['elkjs', 'cytoscape', 'jointjs', '@xyflow/react'],
  '@xyflow/react': ['reactflow', 'cytoscape', 'elkjs'],
  'cytoscape': ['reactflow', 'sigma', 'vis-network'],
  'vis-network': ['cytoscape', 'sigma', 'reactflow'],

  // --- Notification / Toast ---
  'react-hot-toast': ['react-toastify', 'sonner', 'notistack'],
  'react-toastify': ['react-hot-toast', 'sonner', 'notistack'],
  'sonner': ['react-hot-toast', 'react-toastify', 'notistack'],
  'notistack': ['react-hot-toast', 'react-toastify', 'sonner'],

  // --- API Documentation ---
  'swagger-ui-express': ['redoc', 'scalar', '@fastify/swagger-ui'],
  'redoc': ['swagger-ui-express', 'scalar'],
  'scalar': ['swagger-ui-express', 'redoc'],
  '@fastify/swagger': ['swagger-jsdoc', 'scalar'],
  'swagger-jsdoc': ['@fastify/swagger', 'tsoa'],
  'tsoa': ['swagger-jsdoc', '@nestjs/swagger'],
  '@nestjs/swagger': ['tsoa', 'swagger-jsdoc'],

  // --- GraphQL Server ---
  'apollo-server': ['mercurius', 'yoga', '@graphql-tools/schema'],
  '@apollo/server': ['mercurius', 'graphql-yoga', '@graphql-tools/schema'],
  'graphql-yoga': ['@apollo/server', 'mercurius'],
  'mercurius': ['@apollo/server', 'graphql-yoga'],
  'type-graphql': ['nexus', 'pothos-graphql', '@graphql-tools/schema'],
  '@pothos/core': ['nexus', 'type-graphql'],
  'nexus': ['@pothos/core', 'type-graphql'],

  // --- Package Managers ---
  'npm': ['pnpm', 'yarn', 'bun'],
  'pnpm': ['npm', 'yarn', 'bun'],
  'yarn': ['npm', 'pnpm', 'bun'],

  // --- Desktop ---
  'electron': ['tauri', 'neutralinojs', 'nw.js'],
  '@tauri-apps/api': ['electron', 'neutralinojs'],

  // --- Mobile ---
  'react-native': ['expo', 'capacitor', 'nativescript', 'flutter'],
  'expo': ['react-native', 'capacitor'],
  '@capacitor/core': ['react-native', 'expo', 'nativescript'],
  'nativescript': ['react-native', '@capacitor/core'],

  // --- Worker / Thread ---
  'workerpool': ['piscina', 'threads', 'worker-threads'],
  'piscina': ['workerpool', 'threads'],
  'threads': ['workerpool', 'piscina'],
  'comlink': ['workerize', 'threads'],
  'workerize': ['comlink', 'threads'],

  // --- URL / Path ---
  'qs': ['query-string', 'fast-querystring', 'URLSearchParams'],
  'query-string': ['qs', 'fast-querystring'],
  'fast-querystring': ['qs', 'query-string'],
  'path-to-regexp': ['url-pattern', 'route-parser'],

  // --- Diff ---
  'diff': ['jsdiff', 'fast-diff', 'microdiff'],
  'microdiff': ['diff', 'deep-diff', 'fast-diff'],
  'deep-diff': ['microdiff', 'diff'],

  // --- Async Utilities ---
  'p-map': ['async', 'p-all', 'promise.allsettled'],
  'async': ['p-map', 'neo-async', 'bluebird'],
  'neo-async': ['async', 'p-map'],
  'bluebird': ['async', 'p-map'],

  // --- Color ---
  'color': ['tinycolor2', 'chroma-js', 'colord'],
  'tinycolor2': ['color', 'chroma-js', 'colord'],
  'chroma-js': ['color', 'tinycolor2', 'colord'],
  'colord': ['color', 'tinycolor2', 'chroma-js'],

  // --- Cron Expression ---
  'croner': ['cron-parser', 'node-cron'],
  'cron-parser': ['croner', 'node-cron'],

  // --- Sitemap ---
  'sitemap': ['next-sitemap', 'astro-sitemap'],
  'next-sitemap': ['sitemap'],

  // --- IoT / MQTT ---
  'mqtt': ['aedes', 'mosca'],
  'aedes': ['mqtt', 'mosca'],

  // --- Server-Sent Events ---
  'eventsource': ['sse.js', '@microsoft/fetch-event-source'],
  '@microsoft/fetch-event-source': ['eventsource'],

  // --- Task Scheduling ---
  'node-schedule': ['node-cron', 'cron', 'bree'],

  // ============================================================
  // PACKAGIST / PHP PACKAGES
  // ============================================================

  // --- PHP Frameworks ---
  'laravel/framework': ['symfony/symfony', 'cakephp/cakephp', 'codeigniter4/framework', 'slim/slim', 'laminas/laminas-mvc', 'yiisoft/yii2'],
  'symfony/symfony': ['laravel/framework', 'cakephp/cakephp', 'codeigniter4/framework', 'laminas/laminas-mvc'],
  'cakephp/cakephp': ['laravel/framework', 'symfony/symfony', 'codeigniter4/framework', 'yiisoft/yii2'],
  'codeigniter4/framework': ['laravel/framework', 'symfony/symfony', 'cakephp/cakephp', 'slim/slim'],
  'slim/slim': ['laravel/framework', 'symfony/symfony', 'codeigniter4/framework', 'laminas/laminas-mvc'],
  'laminas/laminas-mvc': ['laravel/framework', 'symfony/symfony', 'slim/slim'],
  'yiisoft/yii2': ['laravel/framework', 'symfony/symfony', 'cakephp/cakephp'],
  'spiral/framework': ['laravel/framework', 'symfony/symfony', 'yiisoft/yii2'],
  'hyperf/hyperf': ['laravel/framework', 'spiral/framework', 'swoole/ide-helper'],

  // --- PHP Micro Frameworks ---
  'slim/slim-skeleton': ['slim/slim', 'laravel/lumen-framework'],
  'laravel/lumen-framework': ['slim/slim', 'codeigniter4/framework'],

  // --- PHP HTTP Clients ---
  'guzzlehttp/guzzle': ['symfony/http-client', 'php-http/curl-client', 'amphp/http-client'],
  'symfony/http-client': ['guzzlehttp/guzzle', 'php-http/curl-client', 'amphp/http-client'],
  'php-http/curl-client': ['guzzlehttp/guzzle', 'symfony/http-client'],
  'amphp/http-client': ['guzzlehttp/guzzle', 'symfony/http-client', 'react/http'],
  'react/http': ['amphp/http-client', 'guzzlehttp/guzzle'],

  // --- PHP Template Engines ---
  'twig/twig': ['illuminate/view', 'latte/latte', 'league/plates'],
  'illuminate/view': ['twig/twig', 'latte/latte', 'league/plates'],
  'latte/latte': ['twig/twig', 'illuminate/view', 'league/plates'],
  'league/plates': ['twig/twig', 'illuminate/view', 'latte/latte'],

  // --- PHP ORM / Database ---
  'doctrine/orm': ['illuminate/database', 'cycle/orm', 'propel/propel'],
  'illuminate/database': ['doctrine/orm', 'cycle/orm', 'propel/propel', 'cakephp/orm'],
  'cycle/orm': ['doctrine/orm', 'illuminate/database'],
  'propel/propel': ['doctrine/orm', 'illuminate/database'],
  'cakephp/orm': ['doctrine/orm', 'illuminate/database'],
  'doctrine/dbal': ['illuminate/database', 'cycle/database'],
  'cycle/database': ['doctrine/dbal', 'illuminate/database'],

  // --- PHP Database Migrations ---
  'doctrine/migrations': ['phinx/phinx', 'illuminate/database'],
  'phinx/phinx': ['doctrine/migrations', 'illuminate/database'],
  'robmorgan/phinx': ['doctrine/migrations', 'illuminate/database'],

  // --- PHP Testing ---
  'phpunit/phpunit': ['pestphp/pest', 'codeception/codeception', 'phpspec/phpspec', 'behat/behat'],
  'pestphp/pest': ['phpunit/phpunit', 'codeception/codeception'],
  'codeception/codeception': ['phpunit/phpunit', 'pestphp/pest', 'behat/behat'],
  'phpspec/phpspec': ['phpunit/phpunit', 'pestphp/pest'],
  'behat/behat': ['codeception/codeception', 'phpunit/phpunit'],
  'mockery/mockery': ['phpunit/phpunit', 'prophecy/prophecy'],
  'phpspec/prophecy': ['mockery/mockery', 'phpunit/phpunit'],
  'fakerphp/faker': ['nelmio/alice', 'fzaninotto/faker'],
  'nelmio/alice': ['fakerphp/faker'],
  'laravel/dusk': ['codeception/codeception', 'behat/behat'],

  // --- PHP Logging ---
  'monolog/monolog': ['symfony/monolog-bridge', 'analog/analog', 'katzgrau/klogger', 'seldaek/monolog'],
  'analog/analog': ['monolog/monolog', 'katzgrau/klogger'],
  'katzgrau/klogger': ['monolog/monolog', 'analog/analog'],
  'symfony/monolog-bridge': ['monolog/monolog', 'analog/analog'],

  // --- PHP Auth ---
  'laravel/sanctum': ['tymon/jwt-auth', 'league/oauth2-server', 'laravel/passport'],
  'laravel/passport': ['laravel/sanctum', 'tymon/jwt-auth', 'league/oauth2-server'],
  'tymon/jwt-auth': ['laravel/sanctum', 'lcobucci/jwt', 'firebase/php-jwt'],
  'league/oauth2-server': ['laravel/passport', 'laravel/sanctum'],
  'lcobucci/jwt': ['firebase/php-jwt', 'tymon/jwt-auth'],
  'firebase/php-jwt': ['lcobucci/jwt', 'tymon/jwt-auth'],
  'laravel/fortify': ['laravel/breeze', 'laravel/jetstream'],
  'laravel/breeze': ['laravel/fortify', 'laravel/jetstream'],
  'laravel/jetstream': ['laravel/fortify', 'laravel/breeze'],
  'laravel/socialite': ['hybridauth/hybridauth', 'socialiteproviders/manager'],
  'hybridauth/hybridauth': ['laravel/socialite', 'socialiteproviders/manager'],

  // --- PHP CLI ---
  'symfony/console': ['league/climate', 'nunomaduro/termwind', 'minicli/minicli'],
  'league/climate': ['symfony/console', 'nunomaduro/termwind'],
  'nunomaduro/termwind': ['symfony/console', 'league/climate'],
  'minicli/minicli': ['symfony/console', 'league/climate'],

  // --- PHP Validation ---
  'respect/validation': ['rakit/validation', 'illuminate/validation', 'symfony/validator', 'valitron/valitron'],
  'rakit/validation': ['respect/validation', 'illuminate/validation', 'valitron/valitron'],
  'illuminate/validation': ['respect/validation', 'rakit/validation', 'symfony/validator'],
  'symfony/validator': ['respect/validation', 'illuminate/validation', 'rakit/validation'],
  'valitron/valitron': ['respect/validation', 'rakit/validation'],

  // --- PHP Queue ---
  'laravel/horizon': ['symfony/messenger', 'enqueue/enqueue', 'php-amqplib/php-amqplib'],
  'symfony/messenger': ['laravel/horizon', 'enqueue/enqueue', 'bernard/bernard'],
  'enqueue/enqueue': ['laravel/horizon', 'symfony/messenger', 'php-amqplib/php-amqplib'],
  'php-amqplib/php-amqplib': ['enqueue/enqueue', 'symfony/messenger'],
  'bernard/bernard': ['symfony/messenger', 'enqueue/enqueue'],

  // --- PHP Image ---
  'intervention/image': ['imagine/imagine', 'spatie/image', 'league/glide'],
  'imagine/imagine': ['intervention/image', 'spatie/image'],
  'spatie/image': ['intervention/image', 'imagine/imagine', 'league/glide'],
  'league/glide': ['intervention/image', 'spatie/image'],

  // --- PHP PDF ---
  'dompdf/dompdf': ['mpdf/mpdf', 'tecnickcom/tcpdf', 'barryvdh/laravel-dompdf', 'setasign/fpdf'],
  'mpdf/mpdf': ['dompdf/dompdf', 'tecnickcom/tcpdf', 'setasign/fpdf'],
  'tecnickcom/tcpdf': ['dompdf/dompdf', 'mpdf/mpdf', 'setasign/fpdf'],
  'barryvdh/laravel-dompdf': ['dompdf/dompdf', 'mpdf/mpdf', 'tecnickcom/tcpdf'],
  'setasign/fpdf': ['dompdf/dompdf', 'mpdf/mpdf', 'tecnickcom/tcpdf'],
  'setasign/fpdi': ['setasign/fpdf', 'tecnickcom/tcpdf'],
  'knplabs/knp-snappy': ['dompdf/dompdf', 'mpdf/mpdf'],

  // --- PHP Mail ---
  'symfony/mailer': ['phpmailer/phpmailer', 'swiftmailer/swiftmailer'],
  'phpmailer/phpmailer': ['symfony/mailer', 'swiftmailer/swiftmailer'],
  'swiftmailer/swiftmailer': ['symfony/mailer', 'phpmailer/phpmailer'],

  // --- PHP Cache ---
  'symfony/cache': ['phpfastcache/phpfastcache', 'illuminate/cache', 'doctrine/cache'],
  'phpfastcache/phpfastcache': ['symfony/cache', 'illuminate/cache', 'doctrine/cache'],
  'illuminate/cache': ['symfony/cache', 'phpfastcache/phpfastcache', 'doctrine/cache'],
  'doctrine/cache': ['symfony/cache', 'phpfastcache/phpfastcache', 'illuminate/cache'],

  // --- PHP Admin Panels ---
  'filament/filament': ['laravel/nova', 'backpack/crud', 'orchid/platform', 'voyager'],
  'laravel/nova': ['filament/filament', 'backpack/crud', 'orchid/platform'],
  'backpack/crud': ['filament/filament', 'laravel/nova', 'orchid/platform'],
  'orchid/platform': ['filament/filament', 'laravel/nova', 'backpack/crud'],

  // --- PHP Serialization ---
  'league/fractal': ['spatie/laravel-data', 'jms/serializer', 'symfony/serializer'],
  'spatie/laravel-data': ['league/fractal', 'jms/serializer'],
  'jms/serializer': ['league/fractal', 'symfony/serializer'],
  'symfony/serializer': ['league/fractal', 'jms/serializer', 'spatie/laravel-data'],

  // --- PHP Filesystem ---
  'league/flysystem': ['gaufrette/gaufrette', 'spatie/laravel-medialibrary'],
  'gaufrette/gaufrette': ['league/flysystem'],
  'spatie/laravel-medialibrary': ['league/flysystem', 'intervention/image'],

  // --- PHP HTTP / PSR ---
  'guzzlehttp/psr7': ['nyholm/psr7', 'laminas/laminas-diactoros', 'slim/psr7'],
  'nyholm/psr7': ['guzzlehttp/psr7', 'laminas/laminas-diactoros'],
  'laminas/laminas-diactoros': ['guzzlehttp/psr7', 'nyholm/psr7', 'slim/psr7'],
  'slim/psr7': ['guzzlehttp/psr7', 'nyholm/psr7'],
  'php-di/php-di': ['league/container', 'illuminate/container', 'symfony/dependency-injection'],
  'league/container': ['php-di/php-di', 'illuminate/container', 'symfony/dependency-injection'],
  'illuminate/container': ['php-di/php-di', 'league/container', 'symfony/dependency-injection'],
  'symfony/dependency-injection': ['php-di/php-di', 'league/container', 'illuminate/container'],

  // --- PHP Routing ---
  'symfony/routing': ['nikic/fast-route', 'league/route', 'illuminate/routing'],
  'nikic/fast-route': ['symfony/routing', 'league/route'],
  'league/route': ['symfony/routing', 'nikic/fast-route', 'illuminate/routing'],
  'illuminate/routing': ['symfony/routing', 'nikic/fast-route', 'league/route'],

  // --- PHP Event ---
  'symfony/event-dispatcher': ['league/event', 'illuminate/events', 'cakephp/event'],
  'league/event': ['symfony/event-dispatcher', 'illuminate/events'],
  'illuminate/events': ['symfony/event-dispatcher', 'league/event'],

  // --- PHP Pagination ---
  'pagerfanta/pagerfanta': ['knplabs/knp-paginator-bundle', 'illuminate/pagination'],
  'knplabs/knp-paginator-bundle': ['pagerfanta/pagerfanta', 'illuminate/pagination'],

  // --- PHP UUID ---
  'ramsey/uuid': ['symfony/uid', 'webpatser/laravel-uuid'],
  'symfony/uid': ['ramsey/uuid'],

  // --- PHP Spreadsheet ---
  'phpoffice/phpspreadsheet': ['box/spout', 'openspout/openspout', 'maatwebsite/excel'],
  'maatwebsite/excel': ['phpoffice/phpspreadsheet', 'openspout/openspout'],
  'openspout/openspout': ['phpoffice/phpspreadsheet', 'maatwebsite/excel'],

  // --- PHP Config ---
  'vlucas/phpdotenv': ['symfony/dotenv', 'josegonzalez/dotenv'],
  'symfony/dotenv': ['vlucas/phpdotenv'],

  // --- PHP Markdown ---
  'league/commonmark': ['erusev/parsedown', 'michelf/php-markdown'],
  'erusev/parsedown': ['league/commonmark', 'michelf/php-markdown'],
  'michelf/php-markdown': ['league/commonmark', 'erusev/parsedown'],

  // --- PHP Debugging ---
  'symfony/var-dumper': ['filp/whoops', 'barryvdh/laravel-debugbar', 'kint-php/kint'],
  'filp/whoops': ['symfony/var-dumper', 'barryvdh/laravel-debugbar'],
  'barryvdh/laravel-debugbar': ['filp/whoops', 'clockwork/clockwork'],
  'clockwork/clockwork': ['barryvdh/laravel-debugbar', 'filp/whoops'],
  'kint-php/kint': ['symfony/var-dumper', 'filp/whoops'],

  // --- PHP Static Analysis ---
  'phpstan/phpstan': ['vimeo/psalm', 'phan/phan'],
  'vimeo/psalm': ['phpstan/phpstan', 'phan/phan'],
  'phan/phan': ['phpstan/phpstan', 'vimeo/psalm'],

  // --- PHP Code Style ---
  'friendsofphp/php-cs-fixer': ['squizlabs/php_codesniffer', 'symplify/easy-coding-standard'],
  'squizlabs/php_codesniffer': ['friendsofphp/php-cs-fixer', 'symplify/easy-coding-standard'],
  'symplify/easy-coding-standard': ['friendsofphp/php-cs-fixer', 'squizlabs/php_codesniffer'],

  // --- PHP API ---
  'api-platform/core': ['laravel/framework', 'dingo/api'],
  'dingo/api': ['api-platform/core'],

  // --- PHP Search ---
  'algolia/algoliasearch-client-php': ['meilisearch/meilisearch-php', 'teamtnt/tntsearch'],
  'meilisearch/meilisearch-php': ['algolia/algoliasearch-client-php', 'teamtnt/tntsearch'],
  'teamtnt/tntsearch': ['algolia/algoliasearch-client-php', 'meilisearch/meilisearch-php'],
  'laravel/scout': ['algolia/algoliasearch-client-php', 'meilisearch/meilisearch-php'],

  // --- PHP Slug ---
  'cocur/slugify': ['illuminate/support', 'ausi/slug-generator'],
  'ausi/slug-generator': ['cocur/slugify'],

  // --- PHP i18n ---
  'symfony/translation': ['illuminate/translation', 'astrotomic/laravel-translatable'],
  'illuminate/translation': ['symfony/translation', 'astrotomic/laravel-translatable'],
  'astrotomic/laravel-translatable': ['spatie/laravel-translatable', 'illuminate/translation'],
  'spatie/laravel-translatable': ['astrotomic/laravel-translatable', 'illuminate/translation'],

  // --- PHP Rate Limiting ---
  'symfony/rate-limiter': ['illuminate/routing', 'nikolaposa/rate-limit'],
  'nikolaposa/rate-limit': ['symfony/rate-limiter'],

  // --- PHP WebSocket ---
  'ratchet/pawl': ['beyondcode/laravel-websockets', 'pusher/pusher-php-server'],
  'beyondcode/laravel-websockets': ['ratchet/pawl', 'pusher/pusher-php-server', 'soketi/soketi'],
  'pusher/pusher-php-server': ['beyondcode/laravel-websockets', 'ratchet/pawl'],

  // --- PHP GraphQL ---
  'webonyx/graphql-php': ['nuwave/lighthouse', 'rebing/graphql-laravel'],
  'nuwave/lighthouse': ['webonyx/graphql-php', 'rebing/graphql-laravel'],
  'rebing/graphql-laravel': ['nuwave/lighthouse', 'webonyx/graphql-php'],

  // --- PHP Permissions ---
  'spatie/laravel-permission': ['silber/bouncer', 'laravelviews/laravel-permission'],
  'silber/bouncer': ['spatie/laravel-permission'],

  // --- PHP Scheduler ---
  'dragonmantank/cron-expression': ['illuminate/console'],

  // --- PHP Payment ---
  'stripe/stripe-php': ['paypal/rest-api-sdk-php', 'omnipay/common'],
  'omnipay/common': ['stripe/stripe-php', 'paypal/rest-api-sdk-php'],

  // --- PHP Collections ---
  'illuminate/collections': ['doctrine/collections', 'tightenco/collect'],
  'doctrine/collections': ['illuminate/collections', 'tightenco/collect'],
  'tightenco/collect': ['illuminate/collections', 'doctrine/collections'],

  // --- PHP HTTP Message ---
  'psr/http-message': ['psr/http-factory'],
  'psr/log': ['monolog/monolog'],

  // --- PHP Security ---
  'paragonie/halite': ['defuse/php-encryption', 'sodium_compat'],
  'defuse/php-encryption': ['paragonie/halite'],

  // --- PHP Sitemap ---
  'spatie/laravel-sitemap': ['tackk/cartographer'],

  // --- PHP Error Handling ---
  'spatie/laravel-ignition': ['filp/whoops', 'symfony/error-handler'],
  'symfony/error-handler': ['filp/whoops', 'spatie/laravel-ignition'],

  // --- PHP Activity / Audit ---
  'spatie/laravel-activitylog': ['owen-it/laravel-auditing'],
  'owen-it/laravel-auditing': ['spatie/laravel-activitylog'],

  // --- PHP Backup ---
  'spatie/laravel-backup': ['zenstruck/backup-manager'],

  // --- PHP Feature Flags ---
  'laravel/pennant': ['ylsideas/feature-flags'],

  // --- PHP Notifications ---
  'laravel/notifications': ['symfony/notifier'],
  'symfony/notifier': ['laravel/notifications'],

  // --- PHP Date ---
  'nesbot/carbon': ['cakephp/chronos', 'briannesbitt/carbon'],
  'cakephp/chronos': ['nesbot/carbon'],

  // --- PHP HTML / DOM ---
  'symfony/dom-crawler': ['voku/simple_html_dom_parser', 'masterminds/html5-php'],
  'voku/simple_html_dom_parser': ['symfony/dom-crawler'],

  // --- PHP HTTP Foundation ---
  'symfony/http-foundation': ['laminas/laminas-http', 'guzzlehttp/psr7'],
  'laminas/laminas-http': ['symfony/http-foundation', 'guzzlehttp/psr7'],

  // --- PHP Process ---
  'symfony/process': ['mikey179/vfsstream'],

  // --- PHP Testing Fixtures ---
  'liip/test-fixtures-bundle': ['doctrine/data-fixtures'],
  'doctrine/data-fixtures': ['liip/test-fixtures-bundle'],

  // ============================================================
  // PYPI PACKAGES
  // ============================================================

  // --- Python Web Frameworks ---
  'django': ['flask', 'fastapi', 'tornado', 'sanic', 'starlette', 'litestar'],
  'flask': ['django', 'fastapi', 'tornado', 'sanic', 'starlette', 'bottle'],
  'fastapi': ['flask', 'django', 'starlette', 'litestar', 'sanic', 'tornado'],
  'tornado': ['flask', 'django', 'fastapi', 'sanic', 'twisted'],
  'sanic': ['fastapi', 'flask', 'tornado', 'starlette', 'litestar'],
  'starlette': ['fastapi', 'flask', 'sanic', 'litestar'],
  'litestar': ['fastapi', 'starlette', 'sanic', 'flask'],
  'bottle': ['flask', 'django', 'falcon', 'cherrypy'],
  'falcon': ['flask', 'fastapi', 'bottle', 'starlette'],
  'cherrypy': ['flask', 'bottle', 'falcon', 'tornado'],
  'pyramid': ['django', 'flask', 'falcon'],
  'twisted': ['tornado', 'asyncio', 'trio'],

  // --- Python HTTP Clients ---
  'requests': ['httpx', 'aiohttp', 'urllib3', 'httplib2', 'pycurl'],
  'httpx': ['requests', 'aiohttp', 'urllib3'],
  'aiohttp': ['httpx', 'requests', 'tornado', 'urllib3'],
  'urllib3': ['requests', 'httpx', 'aiohttp'],
  'httplib2': ['requests', 'httpx', 'urllib3'],
  'pycurl': ['requests', 'httpx', 'urllib3'],

  // --- Python ORMs & Database ---
  'sqlalchemy': ['tortoise-orm', 'peewee', 'pony', 'django'],
  'tortoise-orm': ['sqlalchemy', 'peewee', 'pony', 'django'],
  'peewee': ['sqlalchemy', 'tortoise-orm', 'pony'],
  'pony': ['sqlalchemy', 'peewee', 'tortoise-orm'],
  'sqlmodel': ['sqlalchemy', 'tortoise-orm', 'peewee'],
  'alembic': ['django', 'yoyo-migrations'],

  // --- Python Database Drivers ---
  'psycopg2': ['asyncpg', 'psycopg', 'psycopg2-binary'],
  'psycopg2-binary': ['psycopg2', 'asyncpg', 'psycopg'],
  'psycopg': ['psycopg2', 'asyncpg', 'psycopg2-binary'],
  'asyncpg': ['psycopg2', 'psycopg', 'aiopg'],
  'aiopg': ['asyncpg', 'psycopg', 'psycopg2'],
  'pymongo': ['motor', 'mongoengine', 'mongomock'],
  'motor': ['pymongo', 'mongoengine'],
  'mongoengine': ['pymongo', 'motor', 'mongomock'],
  'aioredis': ['redis', 'fakeredis'],
  'aiomysql': ['pymysql', 'mysqlclient', 'asyncmy'],
  'pymysql': ['aiomysql', 'mysqlclient', 'asyncmy'],
  'mysqlclient': ['pymysql', 'aiomysql'],

  // --- Python Testing ---
  'pytest': ['nose2', 'hypothesis', 'ward'],
  'nose2': ['pytest', 'hypothesis'],
  'hypothesis': ['pytest', 'faker', 'factory-boy'],
  'factory-boy': ['faker', 'hypothesis', 'model-bakery'],
  'mimesis': ['faker', 'factory-boy'],
  'pytest-cov': ['coverage', 'pytest-xdist'],
  'coverage': ['pytest-cov'],
  'tox': ['nox', 'pytest'],
  'nox': ['tox', 'pytest'],
  'responses': ['requests-mock', 'httpretty', 'respx'],
  'requests-mock': ['responses', 'httpretty', 'respx'],
  'respx': ['responses', 'requests-mock', 'httpretty'],
  'httpretty': ['responses', 'requests-mock', 'respx'],
  'ward': ['pytest', 'nose2'],

  // --- Python Data Science ---
  'pandas': ['polars', 'dask', 'modin', 'vaex', 'pyarrow'],
  'polars': ['pandas', 'dask', 'modin', 'vaex'],
  'numpy': ['scipy', 'jax', 'cupy'],
  'scipy': ['numpy', 'jax', 'statsmodels'],
  'dask': ['pandas', 'polars', 'modin', 'vaex', 'ray'],
  'modin': ['pandas', 'polars', 'dask', 'vaex'],
  'vaex': ['pandas', 'polars', 'dask', 'modin'],
  'pyarrow': ['pandas', 'polars', 'fastparquet'],
  'fastparquet': ['pyarrow', 'pandas'],

  // --- Python ML / AI ---
  'scikit-learn': ['xgboost', 'lightgbm', 'catboost', 'tensorflow', 'torch'],
  'tensorflow': ['torch', 'jax', 'keras', 'scikit-learn'],
  'torch': ['tensorflow', 'jax', 'keras', 'scikit-learn'],
  'keras': ['tensorflow', 'torch', 'jax'],
  'jax': ['torch', 'tensorflow', 'numpy'],
  'xgboost': ['lightgbm', 'catboost', 'scikit-learn'],
  'lightgbm': ['xgboost', 'catboost', 'scikit-learn'],
  'catboost': ['xgboost', 'lightgbm', 'scikit-learn'],
  'transformers': ['spacy', 'flair', 'sentence-transformers'],
  'spacy': ['transformers', 'nltk', 'flair', 'stanza'],
  'nltk': ['spacy', 'transformers', 'textblob'],
  'flair': ['spacy', 'transformers', 'stanza'],
  'stanza': ['spacy', 'flair', 'nltk'],
  'sentence-transformers': ['transformers', 'spacy'],
  'langchain': ['llama-index', 'haystack-ai', 'semantic-kernel'],
  'llama-index': ['langchain', 'haystack-ai'],
  'openai': ['anthropic', 'cohere', 'google-generativeai'],
  'anthropic': ['openai', 'cohere', 'google-generativeai'],

  // --- Python CLI ---
  'click': ['typer', 'fire', 'rich', 'cement'],
  'typer': ['click', 'fire', 'rich'],
  'fire': ['click', 'typer', 'rich'],
  'rich': ['click', 'typer', 'tqdm', 'colorama'],
  'tqdm': ['rich', 'alive-progress', 'progressbar2'],
  'alive-progress': ['tqdm', 'rich', 'progressbar2'],
  'colorama': ['rich', 'termcolor', 'colored'],
  'termcolor': ['colorama', 'rich', 'colored'],

  // --- Python Async ---
  'trio': ['anyio', 'asyncio', 'uvloop', 'curio'],
  'anyio': ['trio', 'asyncio', 'uvloop'],
  'uvloop': ['asyncio', 'trio', 'anyio'],

  // --- Python Serialization & Validation ---
  'pydantic': ['marshmallow', 'attrs', 'cattrs', 'dataclasses-json'],
  'marshmallow': ['pydantic', 'attrs', 'cattrs', 'cerberus'],
  'attrs': ['pydantic', 'dataclasses', 'cattrs'],
  'cattrs': ['attrs', 'pydantic', 'marshmallow'],
  'cerberus': ['marshmallow', 'pydantic', 'voluptuous'],
  'voluptuous': ['cerberus', 'marshmallow', 'pydantic'],
  'dataclasses-json': ['pydantic', 'marshmallow', 'cattrs'],

  // --- Python Task Queues ---
  'celery': ['rq', 'huey', 'dramatiq', 'arq'],
  'rq': ['celery', 'huey', 'dramatiq', 'arq'],
  'huey': ['celery', 'rq', 'dramatiq'],
  'dramatiq': ['celery', 'rq', 'huey', 'arq'],
  'arq': ['celery', 'rq', 'dramatiq'],

  // --- Python Templating ---
  'jinja2': ['mako', 'chameleon', 'django'],
  'mako': ['jinja2', 'chameleon'],
  'chameleon': ['jinja2', 'mako'],

  // --- Python Auth & Security ---
  'authlib': ['python-jose', 'pyjwt', 'oauthlib'],
  'python-jose': ['authlib', 'pyjwt', 'jwcrypto'],
  'pyjwt': ['python-jose', 'authlib', 'jwcrypto'],
  'oauthlib': ['authlib', 'requests-oauthlib'],
  'passlib': ['bcrypt', 'argon2-cffi'],
  'argon2-cffi': ['passlib', 'bcrypt'],
  'cryptography': ['pynacl', 'pyopenssl'],
  'pynacl': ['cryptography', 'pyopenssl'],

  // --- Python Image Processing ---
  'pillow': ['opencv-python', 'scikit-image', 'wand'],
  'opencv-python': ['pillow', 'scikit-image', 'imageio'],
  'scikit-image': ['pillow', 'opencv-python', 'imageio'],
  'imageio': ['pillow', 'opencv-python', 'scikit-image'],
  'wand': ['pillow', 'opencv-python'],

  // --- Python PDF ---
  'reportlab': ['fpdf2', 'weasyprint', 'pdfkit', 'borb'],
  'fpdf2': ['reportlab', 'weasyprint', 'pdfkit'],
  'weasyprint': ['reportlab', 'fpdf2', 'pdfkit', 'xhtml2pdf'],
  'xhtml2pdf': ['weasyprint', 'reportlab', 'fpdf2'],
  'pypdf': ['pymupdf', 'pdfplumber', 'pdfminer-six'],
  'pymupdf': ['pypdf', 'pdfplumber', 'pdfminer-six'],
  'pdfplumber': ['pypdf', 'pymupdf', 'pdfminer-six'],
  'pdfminer-six': ['pypdf', 'pymupdf', 'pdfplumber'],

  // --- Python Scraping ---
  'beautifulsoup4': ['scrapy', 'lxml', 'parsel', 'selectolax'],
  'scrapy': ['beautifulsoup4', 'selenium', 'playwright', 'httpx'],
  'selenium': ['playwright', 'scrapy', 'splinter'],
  'lxml': ['beautifulsoup4', 'parsel', 'selectolax', 'html5lib'],
  'parsel': ['beautifulsoup4', 'lxml', 'selectolax'],
  'selectolax': ['beautifulsoup4', 'lxml', 'parsel'],

  // --- Python API Frameworks ---
  'djangorestframework': ['django-ninja', 'fastapi', 'flask-restful'],
  'django-ninja': ['djangorestframework', 'fastapi', 'flask-restful'],
  'flask-restful': ['djangorestframework', 'django-ninja', 'fastapi', 'flask-restx'],
  'flask-restx': ['flask-restful', 'djangorestframework', 'fastapi'],

  // --- Python Config ---
  'python-dotenv': ['pydantic-settings', 'dynaconf', 'environs'],
  'pydantic-settings': ['python-dotenv', 'dynaconf', 'environs'],
  'dynaconf': ['python-dotenv', 'pydantic-settings', 'environs'],
  'environs': ['python-dotenv', 'pydantic-settings', 'dynaconf'],

  // --- Python Logging ---
  'loguru': ['structlog', 'eliot'],
  'structlog': ['loguru', 'eliot'],

  // --- Python Linting & Formatting ---
  'ruff': ['flake8', 'pylint', 'black', 'isort'],
  'flake8': ['ruff', 'pylint', 'pyflakes', 'pycodestyle'],
  'pylint': ['ruff', 'flake8', 'pyflakes'],
  'black': ['ruff', 'autopep8', 'yapf', 'blue'],
  'isort': ['ruff', 'usort'],
  'autopep8': ['black', 'ruff', 'yapf'],
  'yapf': ['black', 'autopep8', 'ruff'],

  // --- Python Type Checking ---
  'mypy': ['pyright', 'pytype', 'pyre-check'],
  'pyright': ['mypy', 'pytype', 'pyre-check'],
  'pytype': ['mypy', 'pyright'],

  // --- Python Packaging ---
  'setuptools': ['poetry', 'flit', 'hatch', 'pdm', 'maturin'],
  'poetry': ['setuptools', 'flit', 'hatch', 'pdm'],
  'flit': ['setuptools', 'poetry', 'hatch', 'pdm'],
  'hatch': ['setuptools', 'poetry', 'flit', 'pdm'],
  'pdm': ['setuptools', 'poetry', 'flit', 'hatch'],
  'maturin': ['setuptools', 'pyo3'],
  'twine': ['flit', 'poetry', 'hatch'],

  // --- Python Caching ---
  'cachetools': ['diskcache', 'aiocache', 'dogpile-cache'],
  'diskcache': ['cachetools', 'aiocache', 'dogpile-cache'],
  'aiocache': ['cachetools', 'diskcache'],

  // --- Python Date / Time ---
  'arrow': ['pendulum', 'python-dateutil', 'delorean'],
  'pendulum': ['arrow', 'python-dateutil', 'delorean'],
  'python-dateutil': ['arrow', 'pendulum'],

  // --- Python WebSocket ---
  'websockets': ['channels', 'python-socketio', 'wsproto'],
  'channels': ['websockets', 'python-socketio'],
  'python-socketio': ['websockets', 'channels'],

  // --- Python GraphQL ---
  'graphene': ['strawberry-graphql', 'ariadne', 'graphql-core'],
  'strawberry-graphql': ['graphene', 'ariadne', 'graphql-core'],
  'ariadne': ['graphene', 'strawberry-graphql', 'graphql-core'],

  // --- Python Static Site / Docs ---
  'mkdocs': ['sphinx', 'pdoc', 'pydoc-markdown'],
  'sphinx': ['mkdocs', 'pdoc', 'pydoc-markdown'],
  'pdoc': ['mkdocs', 'sphinx'],

  // --- Python Data Visualization ---
  'matplotlib': ['plotly', 'seaborn', 'altair', 'bokeh'],
  'plotly': ['matplotlib', 'seaborn', 'altair', 'bokeh', 'dash'],
  'seaborn': ['matplotlib', 'plotly', 'altair'],
  'altair': ['matplotlib', 'plotly', 'seaborn', 'bokeh'],
  'bokeh': ['matplotlib', 'plotly', 'altair', 'holoviews'],
  'dash': ['plotly', 'streamlit', 'gradio', 'panel'],
  'streamlit': ['dash', 'gradio', 'panel', 'nicegui'],
  'gradio': ['streamlit', 'dash', 'panel'],

  // --- Python File Handling ---
  'openpyxl': ['xlsxwriter', 'xlrd', 'pandas'],
  'xlsxwriter': ['openpyxl', 'xlrd', 'pandas'],
  'python-docx': ['docxtpl', 'python-pptx'],
  'python-pptx': ['python-docx'],
  'pyyaml': ['ruamel-yaml', 'strictyaml'],
  'ruamel-yaml': ['pyyaml', 'strictyaml'],
  'tomli': ['toml', 'tomllib'],
  'orjson': ['ujson', 'rapidjson', 'simplejson'],
  'ujson': ['orjson', 'rapidjson', 'simplejson'],
  'simplejson': ['orjson', 'ujson'],

  // --- Python Email ---
  'sendgrid': ['mailgun', 'boto3', 'python-postmark'],
  'python-multipart': ['streaming-form-data'],

  // --- Python Dependency Injection ---
  'dependency-injector': ['injector', 'python-inject'],
  'injector': ['dependency-injector', 'python-inject'],

  // --- Python Profiling ---
  'py-spy': ['scalene', 'yappi', 'line-profiler'],
  'scalene': ['py-spy', 'yappi', 'line-profiler'],
  'yappi': ['py-spy', 'scalene', 'line-profiler'],

  // --- Python ASGI Servers ---
  'uvicorn': ['hypercorn', 'daphne', 'granian'],
  'hypercorn': ['uvicorn', 'daphne', 'granian'],
  'daphne': ['uvicorn', 'hypercorn'],
  'granian': ['uvicorn', 'hypercorn'],
  'gunicorn': ['uvicorn', 'hypercorn', 'waitress'],
  'waitress': ['gunicorn', 'uvicorn'],
}

export function getCuratedAlternatives(name: string): string[] | null {
  return CURATED_ALTERNATIVES[name] || null
}

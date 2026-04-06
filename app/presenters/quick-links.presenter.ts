import type { PackageData } from '~/core/package/package.types'
import type { EcosystemId } from '~/core/ecosystem/ecosystem.types'

export interface QuickLinkViewModel {
  label: string
  description: string
  href: string
}

const ECOSYSTEM_LINKS: Record<EcosystemId, (name: string, repo: string | null) => QuickLinkViewModel[]> = {
  npm: (name, repo) => {
    const links: QuickLinkViewModel[] = [
      { label: 'npm', description: 'View on npm', href: `https://www.npmjs.com/package/${name}` },
    ]
    if (repo) links.push({ label: 'GitHub', description: 'View on GitHub', href: `https://github.com/${repo}` })
    links.push(
      { label: 'Bundlephobia', description: 'Check bundle size', href: `https://bundlephobia.com/package/${name}` },
      { label: 'Snyk', description: 'Analyze security', href: `https://snyk.io/advisor/npm-package/${name}` },
      { label: 'Socket', description: 'Scan supply chain', href: `https://socket.dev/npm/package/${name}` },
    )
    return links
  },
  pypi: (name, repo) => {
    const links: QuickLinkViewModel[] = [
      { label: 'PyPI', description: 'View on PyPI', href: `https://pypi.org/project/${name}` },
    ]
    if (repo) links.push({ label: 'GitHub', description: 'View on GitHub', href: `https://github.com/${repo}` })
    links.push({ label: 'Snyk', description: 'Analyze security', href: `https://snyk.io/advisor/python/${name}` })
    return links
  },
  cargo: (name, repo) => {
    const links: QuickLinkViewModel[] = [
      { label: 'crates.io', description: 'View on crates.io', href: `https://crates.io/crates/${name}` },
    ]
    if (repo) links.push({ label: 'GitHub', description: 'View on GitHub', href: `https://github.com/${repo}` })
    return links
  },
  packagist: (name, repo) => {
    const links: QuickLinkViewModel[] = [
      { label: 'Packagist', description: 'View on Packagist', href: `https://packagist.org/packages/${name}` },
    ]
    if (repo) links.push({ label: 'GitHub', description: 'View on GitHub', href: `https://github.com/${repo}` })
    links.push(
      { label: 'Snyk', description: 'Analyze security', href: `https://security.snyk.io/package/composer/${encodeURIComponent(name)}` },
    )
    return links
  },
  go: (name, repo) => {
    const links: QuickLinkViewModel[] = [
      { label: 'pkg.go.dev', description: 'View on Go docs', href: `https://pkg.go.dev/${name}` },
    ]
    if (repo) links.push({ label: 'GitHub', description: 'View on GitHub', href: `https://github.com/${repo}` })
    return links
  },
}

const INSTALL_COMMANDS: Record<EcosystemId, string> = {
  npm: 'npm install',
  pypi: 'pip install',
  cargo: 'cargo add',
  packagist: 'composer require',
  go: 'go get',
}

export function buildQuickLinks(data: PackageData, ecosystem: EcosystemId = 'npm'): QuickLinkViewModel[] {
  const builder = ECOSYSTEM_LINKS[ecosystem]
  return builder(data.registry.name, data.github?.repo ?? null)
}

export function buildInstallCommand(name: string, ecosystem: EcosystemId = 'npm'): string {
  return `${INSTALL_COMMANDS[ecosystem]} ${name}`
}

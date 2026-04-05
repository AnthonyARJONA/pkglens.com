export type LicensePermission = [type: 'check' | 'cross', label: string]

const LICENSES: Record<string, LicensePermission[]> = {
  'MIT': [['check', 'Commercial use'], ['check', 'Modification'], ['check', 'Distribution'], ['cross', 'Liability']],
  'ISC': [['check', 'Commercial use'], ['check', 'Modification'], ['check', 'Distribution'], ['cross', 'Liability']],
  'Apache-2.0': [['check', 'Commercial use'], ['check', 'Modification'], ['check', 'Distribution'], ['check', 'Patent use'], ['cross', 'Trademark use'], ['cross', 'Liability']],
  'BSD-2-Clause': [['check', 'Commercial use'], ['check', 'Modification'], ['check', 'Distribution'], ['cross', 'Liability']],
  'BSD-3-Clause': [['check', 'Commercial use'], ['check', 'Modification'], ['check', 'Distribution'], ['cross', 'Liability']],
  'GPL-3.0': [['check', 'Commercial use'], ['check', 'Modification'], ['check', 'Distribution'], ['cross', 'Sublicensing'], ['cross', 'Liability']],
  'LGPL-3.0': [['check', 'Commercial use'], ['check', 'Modification'], ['check', 'Distribution'], ['cross', 'Liability']],
  'MPL-2.0': [['check', 'Commercial use'], ['check', 'Modification'], ['check', 'Distribution'], ['cross', 'Liability']],
  'Unlicense': [['check', 'Commercial use'], ['check', 'Modification'], ['check', 'Distribution'], ['check', 'Private use']],
  '0BSD': [['check', 'Commercial use'], ['check', 'Modification'], ['check', 'Distribution']],
}

export function getLicensePermissions(license: string | null): LicensePermission[] {
  if (!license) return [['check', 'See license for details']]
  return LICENSES[license] ?? [['check', 'See license for details']]
}

import { registerEcosystem } from '../core/ecosystems/ecosystem.factory'
import { npmResolver } from '../ecosystems/npm/npm.resolver'
import { packagistResolver } from '../ecosystems/packagist/packagist.resolver'
import { pypiResolver } from '../ecosystems/pypi/pypi.resolver'

export default defineNitroPlugin(() => {
  registerEcosystem(npmResolver)
  registerEcosystem(packagistResolver)
  registerEcosystem(pypiResolver)
})

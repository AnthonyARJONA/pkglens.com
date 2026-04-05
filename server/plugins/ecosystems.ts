import { registerEcosystem } from '../core/ecosystems/ecosystem.factory'
import { npmResolver } from '../ecosystems/npm/npm.resolver'

export default defineNitroPlugin(() => {
  registerEcosystem(npmResolver)
})

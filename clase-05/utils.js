import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

// importar movies con createRequire
export const readJSON = (path) => require(path)

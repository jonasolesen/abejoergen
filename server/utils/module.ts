import { isMatching, P } from 'ts-pattern'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'

export const modulePattern = { id: P.number, name: P.string }

export type Module = P.infer<typeof modulePattern>

export function loadModule(id: number): Module {
  const moduleDir = resolve(dirname(fileURLToPath(import.meta.url)), '../../modules')

  const file = readFileSync(join(moduleDir, `module-${id}.json`))
  const parsed = JSON.parse(file.toString())

  if (!isMatching(modulePattern, parsed)) {
    throw new Error('Could not parse module from JSON')
  }

  return parsed
}

import { readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'node-html-parser'

export default defineEventHandler((event) => {
  const name = getRouterParam(event, 'name')

  const htmlDir = resolve(dirname(fileURLToPath(import.meta.url)), '../../private')

  const file = readFileSync(join(htmlDir, `${name}.html`))

  const parsed = parse(file.toString())
  const links = parsed.getElementsByTagName('a')

  for (const link of links) {
    const original = link.getAttribute('href')
    if (!original) continue

    const [, fileName = undefined] = original.match(/\/(\S*)\.html/) ?? []

    link.setAttribute('href', `/?file=${fileName}`)
  }

  return parsed.toString()
})

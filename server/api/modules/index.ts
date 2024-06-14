import type { Module } from '../../utils/module'

export default defineEventHandler(() => {
  const modules: Module[] = [
    { id: 1, name: 'First' },
    { id: 2, name: 'Second' },
  ]

  return modules
})

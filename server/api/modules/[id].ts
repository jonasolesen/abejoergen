import { loadModule } from '../../utils/module'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')

  const parsedId = Number(id)
  if (!Number.isInteger(parsedId)) {
    return createError('Could not get id')
  }

  try {
    const module = loadModule(parsedId)

    return module
  } catch (e) {
    return e instanceof Error ? createError(e) : createError('Could not find module')
  }
})

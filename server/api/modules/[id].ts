import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'url';
import { isMatching, P } from 'ts-pattern';

const modulePattern = { id: P.number, name: P.string };

type Module = P.infer<typeof modulePattern>;

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id');
  if (id === undefined) {
    return createError('Could not get id');
  }

  const moduleDir = resolve(
    // @ts-expect-error
    dirname(fileURLToPath(import.meta.url)),
    '../../modules'
  );

  try {
    const file = readFileSync(join(moduleDir, `module-${id}.json`));
    const parsed = JSON.parse(file.toString());

    if (!isMatching(modulePattern, parsed)) {
      return createError('Could not parse module from JSON');
    }

    return parsed;
  } catch (e) {
    return createError('Could not find module');
    return e instanceof Error ? createError(e) : createError('Unknown error');
  }
});

import { join } from 'path';

export function getScriptPath(root?: string) {
  if (root && root.startsWith('/')) {
    return root;
  }

  const scriptInitRoot = process.env.INIT_CWD;

  if (!scriptInitRoot || scriptInitRoot === '') {
    throw new Error('Could not find root path for script');
  }

  return join(scriptInitRoot, root || '');
}

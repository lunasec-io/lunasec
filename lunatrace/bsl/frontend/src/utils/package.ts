export function formatPackageName(packageName: string): string {
  const nameOverflow = packageName && packageName.length > 41 ? '...' : '';
  const formattedPackageName = packageName?.substring(0, 40) || '';
  return formattedPackageName + nameOverflow;
}

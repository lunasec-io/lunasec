export function removeAuthFromGitUrl(gitUrl: string) {
  const parsedGitUrl = new URL(gitUrl);

  if (parsedGitUrl.password !== '') {
    parsedGitUrl.password = '<CENSORED>';
  }
  return parsedGitUrl.toString();
}

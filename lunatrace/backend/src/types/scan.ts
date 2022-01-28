export interface Finding {
  package_name: string;
  version: string;
  version_matcher: string;
  type: string;
  locations: string[];
  language: string;
  purl: string;
  virtual_path: string | null;
  matcher: string;
  meta: {
    vuln_slug: string;
    pkg_slug: string;
    version_slug: string;
  };
}

export interface Report {
  findings: Finding[];
  source_type: string;
  target: string;
  db_date: Date;
  grype_version: string;
  distro_name: string;
  distro_version: string;
  project_id: string;
}

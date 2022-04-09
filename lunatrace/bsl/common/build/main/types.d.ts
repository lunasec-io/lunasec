export declare const severityOrder: string[];
export interface Finding {
    created_at: string;
    purl: string;
    locations: string[];
    severity: typeof severityOrder[number];
    version: string;
    language: string;
    type: string;
    vulnerability: {
        namespace: string;
        slug: string;
        cvss_score?: number;
    };
    package_name: string;
    fix_state: string | null;
    fix_versions?: string[];
    vulnerability_id: string;
}
export interface VulnerablePackage<F extends Finding> {
    created_at: string;
    purl: string;
    locations: string[];
    severity: typeof severityOrder[number];
    version: string;
    language: string;
    type: string;
    package_name: string;
    cvss_score: number | null;
    fix_state: string | null;
    fix_versions: string[];
    findings: F[];
    project_id: string;
}

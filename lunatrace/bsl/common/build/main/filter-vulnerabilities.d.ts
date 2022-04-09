export interface FindingToIgnore {
    locations: string[];
    vulnerability: {
        ignored_vulnerabilities: Array<{
            locations: string[];
        }>;
    };
}
export declare function filterFindingsByIgnored<F extends FindingToIgnore>(findings: F[]): F[];

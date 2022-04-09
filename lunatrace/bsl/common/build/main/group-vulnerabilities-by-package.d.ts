import { Finding, VulnerablePackage } from './types';
export declare function groupByPackage<F extends Finding>(project_id: string, findings: F[]): VulnerablePackage<F>[];

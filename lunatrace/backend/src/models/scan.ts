import { exec } from 'child_process';
import { promisify } from 'util';

import { Convert, GrypeScanReport } from '../types/grypeScanReport';

const promisifiedExec = promisify(exec);

export class Scan {
  static async runGrypeScan(sbomPath: string): Promise<GrypeScanReport> {
    const { stdout } = await promisifiedExec(`grype ${sbomPath} -o json\n`);
    return Convert.toScanReport(stdout);
  }
}

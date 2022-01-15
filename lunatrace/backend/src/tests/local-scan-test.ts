import { Scan } from '../models/scan';

void Scan.runGrypeScan('~/tmp/syftoutput.json').then((res) => {
  console.log(res);
});

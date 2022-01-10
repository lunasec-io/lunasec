import { Scan } from '../models/scan';

Scan.runGrypeScan('~/tmp/syftoutput.json').then((res) => {
  console.log(res);
});

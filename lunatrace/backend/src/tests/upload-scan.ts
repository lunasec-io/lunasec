import { Scan } from '../models/scan';

void Scan.uploadScan('~/tmp/syftoutput.json', 'f11d9a9c-0398-40aa-a1fa-1be563e5f7bd').then((res) => {
  console.log(res);
});

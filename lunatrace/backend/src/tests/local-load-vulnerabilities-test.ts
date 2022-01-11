import { Vulnerability } from '../models/vulnerability';

void Vulnerability.loadVulnerabilities('/home/forrest/.cache/grype/db/3/vulnerability.db').then((res) => {
  console.log(res);
});

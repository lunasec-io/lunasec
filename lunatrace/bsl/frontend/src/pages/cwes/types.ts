import { GetCwesQuery } from '../../api/generated';

export type GetCwes = GetCwesQuery['vulnerability_cwe'][number];

/*
 * Copyright by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Business Source License v1.1
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { LunaLogger } from '@lunatrace/logger';

const perPage = 100;

export async function walkPagination<Item>(
  log: LunaLogger,
  callGithub: (page: number, perPage: number) => Promise<{ newItems: Item[]; total: number }>
) {
  const items: Item[] = [];

  // Cap at 100 iterations just because infinite loops suck.
  for (let page = 1; page < 10000; page++) {
    log.info('walking github pagination', { page });

    const { newItems, total } = await callGithub(page, perPage);
    log.info('fetched new items while walking through github pagination: ', newItems);
    items.push(...newItems);

    if (items.length >= total) {
      log.info(`finished collecting github data`);
      return items;
    }

    log.info(`continuing to walk pagination because we haven't reached the total count`);
  }

  log.error(`hit max iterations for github pagination`);

  throw new Error('Hit max iterations while walking github pagination ');
}

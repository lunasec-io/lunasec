import { LunaLogger } from '@lunatrace/logger';
import { Octokit } from 'octokit';

const PER_PAGE = 100;

export async function walkPagination<Item>(
  log: LunaLogger,
  callGithub: (page: number, perPage: number) => Promise<{ newItems: Item[]; total: number }>
) {
  const items: Item[] = [];

  // Cap at 100 iterations just because infinite loops suck.
  for (let page = 1; page < 10000; page++) {
    log.info(`Walking github pagination #${page}`);

    const { newItems, total } = await callGithub(page, PER_PAGE);
    log.info('fetched new items while walking through github pagination: ', newItems);
    items.push(...newItems);

    if (items.length >= total) {
      log.info(`finished collecting github data`);
      return items;
    }

    log.info(`Continuing to walk pagination because we havent reached the total count`);
  }

  log.error(` Hit max iterations for github pagination`);

  throw new Error('Hit max iterations while walking github pagination ');
}

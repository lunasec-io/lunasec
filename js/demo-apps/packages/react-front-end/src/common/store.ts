import { createTypedHooks } from 'easy-peasy';

import { store as dedicatedPassportExpressStore } from '../dedicated-tokenizer/passport-express/store';
import { store as dedicatedPassportGraphQlStore } from '../dedicated-tokenizer/passport-graphql/store';

import { StoreModel } from './types';

export function getStore() {
  switch (window.location.hash.substring(1)) {
    case 'dedicated-passport-express':
      return dedicatedPassportExpressStore;
    case 'dedicated-passport-graphql':
      return dedicatedPassportGraphQlStore;
    default:
      throw new Error('Must set DEMO_NAME env var to a suitable demo name');
  }
}

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

// @ts-ignore
import util from 'util';

import { ApolloServerPlugin } from 'apollo-server-plugin-base';

// TODO:  This is broken at the moment, pending a way of telling the plugin which fields to require grants for
export const LunaSecApolloPlugin: ApolloServerPlugin = {
  requestDidStart(_requestContext) {
    /* Within this returned object, define functions that respond
       to request-specific lifecycle events. */
    return {
      executionDidStart(resolveContext) {
        console.log('The resolve context is!!!!!!!!!!!!!!!!!!: ');
        console.log(util.inspect(resolveContext, { showHidden: false, depth: null }));
        console.log('mutation selection set is!!!!!!!! ', resolveContext.operation.selectionSet.selections[0]);

        console.log(
          'formdata selection set is!!!!!!!!!!: ',
          //@ts-ignore
          resolveContext.operation.selectionSet.selections[0].selectionSet.selections
        );
        return {
          //@ts-ignore
          willResolveField(fieldResolveParams) {
            console.log(
              'WILL RESOLVE FIELD WAS CALLED with ',
              util.inspect(fieldResolveParams, { showHidden: false, depth: null })
            );
          },
        };
      },
    };
  },
};

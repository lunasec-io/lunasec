// @ts-ignore
import util from 'util';

import { ApolloServerPlugin } from 'apollo-server-plugin-base';

// TODO:  This is broken at the moment, pending a way of telling the plugin which fields to require grants for
// We can't just verify all of the tokens we find because of the possibility of hackers putting them in weird feels and poisoning other peoples requests
// Most of our ideas for a solution involve using a singleton that's accessed by both the directive and this plugin to keep track of which tokens need verifying

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

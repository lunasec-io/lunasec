// @ts-ignore
import util from 'util';

import { ApolloServerPlugin } from 'apollo-server-plugin-base';

export const LunaSecApolloPlugin: ApolloServerPlugin = {
  requestDidStart(_requestContext) {
    // console.log('APOLLO PLUGIN BASE REQUEST CONTEXT IS ', requestContext);
    /* Within this returned object, define functions that respond
       to request-specific lifecycle events. */
    return {
      responseForOperation(resolveContext) {
        console.log('The resolve context is!!!!!!!!!!!!!!!!!!: ');
        console.log(util.inspect(resolveContext, { showHidden: false, depth: null }));

        console.log('mutation selection set is!!!!!!!! ', resolveContext.operation.selectionSet.selections[0]);

        console.log(
          'formdata selection set is!!!!!!!!!!: ',
          //@ts-ignore
          resolveContext.operation.selectionSet.selections[0].selectionSet.selections
        );
        return Promise.resolve(null);
      },
    };
  },
};

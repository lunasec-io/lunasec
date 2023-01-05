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
import { YogaInitialContext } from '@graphql-yoga/node';

export interface JWTClaims {
  'https://hasura.io/jwt/claims': {
    'x-hasura-access-token'?: string;
    'x-hasura-allowed-roles'?: string[];
    'x-hasura-default-role'?: string;
    'x-hasura-user-id'?: string;
    'x-hasura-real-user-id'?: string;
  };
  [x: string]: unknown;
}

export interface Context extends YogaInitialContext {
  req: YogaInitialContext['request'] & {
    user: JWTClaims | undefined;
  };
}

export type ContextLoggedIn = Context & {
  req: {
    user: NonNullable<
      Context['req']['user'] & {
        'https://hasura.io/jwt/claims': { 'x-hasura-user-id': string; 'x-hasura-real-user-id': string };
      }
    >;
  };
};

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
import {GraphQLYogaError,YogaInitialContext } from "@graphql-yoga/node";
import expressJwt from 'express-jwt';
import jsonwebtoken from 'jsonwebtoken'
import jwkToPem from 'jwk-to-pem'
import jwksClient from 'jwks-rsa'

import {getJwksConfig} from "../config";
import {logger} from "../utils/logger";
const jwksConfig = getJwksConfig();

export interface JWTClaims {
    "x-hasura-claims": Record<string, string|undefined>
}

export interface Context extends YogaInitialContext {
    request: YogaInitialContext['request'] & {
        user: JWTClaims | undefined;
    };
}

//
// const jwksFetcher = jwksClient({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: jwksConfig.jwksUri,
// })
//
// export const generateContext = async (initialContext:YogaInitialContext): Promise<Context> => {
//     // Auth stuff
//     if (initialContext.operationName === 'IntrospectionQuery'){
//         logger.log('skipping auth because this is just introspection')
//         return initialContext;
//     }
//
//     // expressJwt({
//     //     secret: jwksClient.expressJwtSecret({
//     //         cache: true,
//     //         rateLimit: true,
//     //         jwksRequestsPerMinute: 5,
//     //         jwksUri: jwksConfig.jwksUri,
//     //     }),
//     //
//     //     issuer: jwksConfig.jwksIssuer,
//     //     algorithms: ['RS256'],
//     // })(initialContext.request as Express.Request, {}, (err?:Error) => {
//     //
//     // })
//
//
//
//     const rawAuthHeader = initialContext.request.headers.get('authorization')
//     if (!rawAuthHeader){
//         throw new GraphQLYogaError('Missing authentication in authorization header')
//     }
//     const decodedToken = jsonwebtoken.decode(rawAuthHeader, {complete:true})
//     if (!decodedToken){
//         throw new GraphQLYogaError('Failed to decode JWT to retrieve KID')
//     }
//     const kid = decodedToken.header.kid;
//     const key = await jwksFetcher.getSigningKey(kid);
//     const publicKey = key.getPublicKey();
//     const jwtPayload = await decodeToken(rawAuthHeader.split('Bearer ')[1], publicKey)
//     return {...initialContext, jwt: jwtPayload}
// }
//
// function decodeToken(jwt:string, key:string): Promise<Context['jwt']>{
//     logger.log('validating ', jwt, ' with key ', key)
//     return new Promise((resolve, reject) => {
//         jsonwebtoken.verify(jwt, key, {
//             issuer: jwksConfig.jwksIssuer,
//             algorithms: ['RS256']}, (err, decoded) => {
//                 if (err || !decoded || typeof decoded === 'string'){
//                     logger.error(err)
//                     return reject(new GraphQLYogaError('Invalid JWT'))
//                 }
//                 if (!('x-hasura-claims' in decoded)){
//                     return reject(new GraphQLYogaError('Invalid JWT'))
//                 }
//                 return resolve(decoded as Context['jwt'])
//             }
//         )
//
//     })
// }

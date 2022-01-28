/*
 * Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import serverlessExpress from '@vendia/serverless-express';

import { app } from './app';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const handler = serverlessExpress({ app });

// EXAMPLE MORE COMPLEX FUNCTIONALITY ---------------------
// require('source-map-support/register')
// const serverlessExpress = require('@vendia/serverless-express')
// const app = require('./app')
//
// let serverlessExpressInstance
//
// function asyncTask () {
//     return new Promise((resolve) => {
//         setTimeout(() => resolve('connected to database'), 1000)
//     })
// }
//
// async function setup (event, context) {
//     const asyncValue = await asyncTask()
//     console.log(asyncValue)
//     serverlessExpressInstance = serverlessExpress({ app })
//     return serverlessExpressInstance(event, context)
// }
//
// function handler (event, context) {
//     if (serverlessExpressInstance) return serverlessExpressInstance(event, context)
//
//     return setup(event, context)
// }
//
// exports.handler = handler

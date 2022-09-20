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
const express = require('express')
const app = express()
const port = 3000
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:')
const util = require('util')

async function makeQuery(queryData) {
  // ruleid: tainted-sql-string
  const query = "SELECT * FROM `users`" + " WHERE id = '" + queryData + "'"
  return await sequelize.query(query);
}

function sanitizeInput(query) {
  return query;
}

app.get('/test', (req, res) => {
  // ruleid: tainted-sql-string
  const [results, metadata] = await makeQuery(req.query.message)
  res.send(results)
})

app.get('/test-safe', (req, res) => {
  const [results, metadata] = await makeQuery(sanitizeInput(req.query.message))
  res.send(results)
})

app.get('/test1', (req, res) => {
  // ruleid: tainted-sql-string
  const [results, metadata] = await sequelize.query("SELECT * FROM `users`" + " WHERE id = '" + req.query.message + "'");
  res.send(results)
})


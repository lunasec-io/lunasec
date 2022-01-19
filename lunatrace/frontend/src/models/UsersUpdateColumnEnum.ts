/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum UsersUpdateColumn {
  created_at="created_at",
email="email",
id="id",
name="name"
}

/**
* UsersUpdateColumn
 *
 * update columns of table "users"
*/
export const UsersUpdateColumnEnumType = types.enumeration("UsersUpdateColumn", [
        "created_at", // column name
  "email", // column name
  "id", // column name
  "name", // column name
      ])

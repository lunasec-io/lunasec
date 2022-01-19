/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum UsersSelectColumn {
  created_at="created_at",
email="email",
id="id",
name="name"
}

/**
* UsersSelectColumn
 *
 * select columns of table "users"
*/
export const UsersSelectColumnEnumType = types.enumeration("UsersSelectColumn", [
        "created_at", // column name
  "email", // column name
  "id", // column name
  "name", // column name
      ])

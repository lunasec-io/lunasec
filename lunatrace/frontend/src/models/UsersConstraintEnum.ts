/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum UsersConstraint {
  users_pkey="users_pkey"
}

/**
* UsersConstraint
 *
 * unique or primary key constraints on table "users"
*/
export const UsersConstraintEnumType = types.enumeration("UsersConstraint", [
        "users_pkey", // unique or primary key constraint
      ])

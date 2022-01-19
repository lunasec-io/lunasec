/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum ScansConstraint {
  scans_pkey="scans_pkey"
}

/**
* ScansConstraint
 *
 * unique or primary key constraints on table "scans"
*/
export const ScansConstraintEnumType = types.enumeration("ScansConstraint", [
        "scans_pkey", // unique or primary key constraint
      ])

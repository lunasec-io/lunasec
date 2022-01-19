/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum FindingsConstraint {
  findings_pkey="findings_pkey"
}

/**
* FindingsConstraint
 *
 * unique or primary key constraints on table "findings"
*/
export const FindingsConstraintEnumType = types.enumeration("FindingsConstraint", [
        "findings_pkey", // unique or primary key constraint
      ])

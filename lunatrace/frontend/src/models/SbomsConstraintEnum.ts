/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum SbomsConstraint {
  sboms_pkey="sboms_pkey"
}

/**
* SbomsConstraint
 *
 * unique or primary key constraints on table "sboms"
*/
export const SbomsConstraintEnumType = types.enumeration("SbomsConstraint", [
        "sboms_pkey", // unique or primary key constraint
      ])

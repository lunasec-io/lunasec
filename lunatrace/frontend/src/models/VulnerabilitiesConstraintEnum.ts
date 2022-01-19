/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum VulnerabilitiesConstraint {
  vulnerabilities_pkey="vulnerabilities_pkey",
vulnerabilities_slug_key="vulnerabilities_slug_key"
}

/**
* VulnerabilitiesConstraint
 *
 * unique or primary key constraints on table "vulnerabilities"
*/
export const VulnerabilitiesConstraintEnumType = types.enumeration("VulnerabilitiesConstraint", [
        "vulnerabilities_pkey", // unique or primary key constraint
  "vulnerabilities_slug_key", // unique or primary key constraint
      ])

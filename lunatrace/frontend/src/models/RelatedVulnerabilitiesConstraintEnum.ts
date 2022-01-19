/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum RelatedVulnerabilitiesConstraint {
  constraint_name="constraint_name",
related_vulnerabilities_pkey="related_vulnerabilities_pkey"
}

/**
* RelatedVulnerabilitiesConstraint
 *
 * unique or primary key constraints on table "related_vulnerabilities"
*/
export const RelatedVulnerabilitiesConstraintEnumType = types.enumeration("RelatedVulnerabilitiesConstraint", [
        "constraint_name", // unique or primary key constraint
  "related_vulnerabilities_pkey", // unique or primary key constraint
      ])

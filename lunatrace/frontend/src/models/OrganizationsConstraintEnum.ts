/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum OrganizationsConstraint {
  organizations_pkey="organizations_pkey"
}

/**
* OrganizationsConstraint
 *
 * unique or primary key constraints on table "organizations"
*/
export const OrganizationsConstraintEnumType = types.enumeration("OrganizationsConstraint", [
        "organizations_pkey", // unique or primary key constraint
      ])

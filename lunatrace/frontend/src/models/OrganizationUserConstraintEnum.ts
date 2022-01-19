/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum OrganizationUserConstraint {
  organization_user_pkey="organization_user_pkey"
}

/**
* OrganizationUserConstraint
 *
 * unique or primary key constraints on table "organization_user"
*/
export const OrganizationUserConstraintEnumType = types.enumeration("OrganizationUserConstraint", [
        "organization_user_pkey", // unique or primary key constraint
      ])

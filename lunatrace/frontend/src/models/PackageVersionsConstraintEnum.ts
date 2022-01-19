/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum PackageVersionsConstraint {
  package_versions_pkey="package_versions_pkey",
package_versions_slug_key="package_versions_slug_key"
}

/**
* PackageVersionsConstraint
 *
 * unique or primary key constraints on table "package_versions"
*/
export const PackageVersionsConstraintEnumType = types.enumeration("PackageVersionsConstraint", [
        "package_versions_pkey", // unique or primary key constraint
  "package_versions_slug_key", // unique or primary key constraint
      ])

/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum PackageVersionsUpdateColumn {
  cpes="cpes",
fix_state="fix_state",
fixed_in_versions="fixed_in_versions",
id="id",
pkg_slug="pkg_slug",
slug="slug",
version_constraint="version_constraint",
version_format="version_format"
}

/**
* PackageVersionsUpdateColumn
 *
 * update columns of table "package_versions"
*/
export const PackageVersionsUpdateColumnEnumType = types.enumeration("PackageVersionsUpdateColumn", [
        "cpes", // column name
  "fix_state", // column name
  "fixed_in_versions", // column name
  "id", // column name
  "pkg_slug", // column name
  "slug", // column name
  "version_constraint", // column name
  "version_format", // column name
      ])

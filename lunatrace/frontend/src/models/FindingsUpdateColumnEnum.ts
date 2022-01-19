/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum FindingsUpdateColumn {
  id="id",
language="language",
locations="locations",
matcher="matcher",
package_name="package_name",
package_version_id="package_version_id",
purl="purl",
report_id="report_id",
type="type",
version="version",
version_matcher="version_matcher",
virtual_path="virtual_path",
vulnerability_id="vulnerability_id",
vulnerability_package_id="vulnerability_package_id"
}

/**
* FindingsUpdateColumn
 *
 * update columns of table "findings"
*/
export const FindingsUpdateColumnEnumType = types.enumeration("FindingsUpdateColumn", [
        "id", // column name
  "language", // column name
  "locations", // column name
  "matcher", // column name
  "package_name", // column name
  "package_version_id", // column name
  "purl", // column name
  "report_id", // column name
  "type", // column name
  "version", // column name
  "version_matcher", // column name
  "virtual_path", // column name
  "vulnerability_id", // column name
  "vulnerability_package_id", // column name
      ])

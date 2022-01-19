/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum RelatedVulnerabilitiesUpdateColumn {
  id="id",
related_vulnerability_slug="related_vulnerability_slug",
vulnerability_slug="vulnerability_slug"
}

/**
* RelatedVulnerabilitiesUpdateColumn
 *
 * update columns of table "related_vulnerabilities"
*/
export const RelatedVulnerabilitiesUpdateColumnEnumType = types.enumeration("RelatedVulnerabilitiesUpdateColumn", [
        "id", // column name
  "related_vulnerability_slug", // column name
  "vulnerability_slug", // column name
      ])

/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum SbomsUpdateColumn {
  created_at="created_at",
id="id",
s3_url="s3_url"
}

/**
* SbomsUpdateColumn
 *
 * update columns of table "sboms"
*/
export const SbomsUpdateColumnEnumType = types.enumeration("SbomsUpdateColumn", [
        "created_at", // column name
  "id", // column name
  "s3_url", // column name
      ])

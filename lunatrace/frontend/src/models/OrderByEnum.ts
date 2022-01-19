/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum OrderBy {
  asc="asc",
asc_nulls_first="asc_nulls_first",
asc_nulls_last="asc_nulls_last",
desc="desc",
desc_nulls_first="desc_nulls_first",
desc_nulls_last="desc_nulls_last"
}

/**
* OrderBy
 *
 * column ordering options
*/
export const OrderByEnumType = types.enumeration("OrderBy", [
        "asc", // in ascending order, nulls last
  "asc_nulls_first", // in ascending order, nulls first
  "asc_nulls_last", // in ascending order, nulls last
  "desc", // in descending order, nulls first
  "desc_nulls_first", // in descending order, nulls first
  "desc_nulls_last", // in descending order, nulls last
      ])

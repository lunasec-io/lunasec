/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum OrganizationsUpdateColumn {
  createdAt="createdAt",
id="id",
name="name",
settings_id="settings_id"
}

/**
* OrganizationsUpdateColumn
 *
 * update columns of table "organizations"
*/
export const OrganizationsUpdateColumnEnumType = types.enumeration("OrganizationsUpdateColumn", [
        "createdAt", // column name
  "id", // column name
  "name", // column name
  "settings_id", // column name
      ])

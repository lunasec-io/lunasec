/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum OrganizationsSelectColumn {
  createdAt="createdAt",
id="id",
name="name",
settings_id="settings_id"
}

/**
* OrganizationsSelectColumn
 *
 * select columns of table "organizations"
*/
export const OrganizationsSelectColumnEnumType = types.enumeration("OrganizationsSelectColumn", [
        "createdAt", // column name
  "id", // column name
  "name", // column name
  "settings_id", // column name
      ])

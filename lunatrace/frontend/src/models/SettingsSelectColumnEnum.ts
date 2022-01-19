/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum SettingsSelectColumn {
  created_at="created_at",
id="id",
is_org_settings="is_org_settings"
}

/**
* SettingsSelectColumn
 *
 * select columns of table "settings"
*/
export const SettingsSelectColumnEnumType = types.enumeration("SettingsSelectColumn", [
        "created_at", // column name
  "id", // column name
  "is_org_settings", // column name
      ])

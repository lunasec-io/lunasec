/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum OrganizationUserSelectColumn {
  created_at="created_at",
id="id",
organization_id="organization_id",
updated_at="updated_at",
user_id="user_id"
}

/**
* OrganizationUserSelectColumn
 *
 * select columns of table "organization_user"
*/
export const OrganizationUserSelectColumnEnumType = types.enumeration("OrganizationUserSelectColumn", [
        "created_at", // column name
  "id", // column name
  "organization_id", // column name
  "updated_at", // column name
  "user_id", // column name
      ])

/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum ProjectsSelectColumn {
  created_at="created_at",
id="id",
name="name",
organization_id="organization_id",
repo="repo",
settings_id="settings_id"
}

/**
* ProjectsSelectColumn
 *
 * select columns of table "projects"
*/
export const ProjectsSelectColumnEnumType = types.enumeration("ProjectsSelectColumn", [
        "created_at", // column name
  "id", // column name
  "name", // column name
  "organization_id", // column name
  "repo", // column name
  "settings_id", // column name
      ])

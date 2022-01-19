/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum ScansSelectColumn {
  created_at="created_at",
db_date="db_date",
distro_name="distro_name",
distro_version="distro_version",
grype_version="grype_version",
id="id",
project_id="project_id",
sbom_id="sbom_id",
source_type="source_type",
target="target"
}

/**
* ScansSelectColumn
 *
 * select columns of table "scans"
*/
export const ScansSelectColumnEnumType = types.enumeration("ScansSelectColumn", [
        "created_at", // column name
  "db_date", // column name
  "distro_name", // column name
  "distro_version", // column name
  "grype_version", // column name
  "id", // column name
  "project_id", // column name
  "sbom_id", // column name
  "source_type", // column name
  "target", // column name
      ])

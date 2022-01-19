/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum VulnerabilitiesSelectColumn {
  created_at="created_at",
cvss_exploitability_score="cvss_exploitability_score",
cvss_impact_score="cvss_impact_score",
cvss_inferred="cvss_inferred",
cvss_score="cvss_score",
cvss_version="cvss_version",
data_source="data_source",
description="description",
id="id",
name="name",
namespace="namespace",
record_source="record_source",
severity="severity",
slug="slug",
topic_id="topic_id",
urls="urls"
}

/**
* VulnerabilitiesSelectColumn
 *
 * select columns of table "vulnerabilities"
*/
export const VulnerabilitiesSelectColumnEnumType = types.enumeration("VulnerabilitiesSelectColumn", [
        "created_at", // column name
  "cvss_exploitability_score", // column name
  "cvss_impact_score", // column name
  "cvss_inferred", // column name
  "cvss_score", // column name
  "cvss_version", // column name
  "data_source", // column name
  "description", // column name
  "id", // column name
  "name", // column name
  "namespace", // column name
  "record_source", // column name
  "severity", // column name
  "slug", // column name
  "topic_id", // column name
  "urls", // column name
      ])

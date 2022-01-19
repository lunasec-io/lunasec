/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * ScansMinFieldsBase
 * auto generated base class for the model ScansMinFieldsModel.
 *
 * aggregate min on columns
 */
export const ScansMinFieldsModelBase = ModelBase
  .named('ScansMinFields')
  .props({
    __typename: types.optional(types.literal("scans_min_fields"), "scans_min_fields"),
    created_at: types.union(types.undefined, types.null, types.frozen()),
    db_date: types.union(types.undefined, types.null, types.frozen()),
    distro_name: types.union(types.undefined, types.null, types.string),
    distro_version: types.union(types.undefined, types.null, types.string),
    grype_version: types.union(types.undefined, types.null, types.string),
    id: types.union(types.undefined, types.null, types.frozen()),
    project_id: types.union(types.undefined, types.null, types.frozen()),
    sbom_id: types.union(types.undefined, types.null, types.frozen()),
    source_type: types.union(types.undefined, types.null, types.string),
    target: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ScansMinFieldsModelSelector extends QueryBuilder {
  get created_at() { return this.__attr(`created_at`) }
  get db_date() { return this.__attr(`db_date`) }
  get distro_name() { return this.__attr(`distro_name`) }
  get distro_version() { return this.__attr(`distro_version`) }
  get grype_version() { return this.__attr(`grype_version`) }
  get id() { return this.__attr(`id`) }
  get project_id() { return this.__attr(`project_id`) }
  get sbom_id() { return this.__attr(`sbom_id`) }
  get source_type() { return this.__attr(`source_type`) }
  get target() { return this.__attr(`target`) }
}
export function selectFromScansMinFields() {
  return new ScansMinFieldsModelSelector()
}

export const scansMinFieldsModelPrimitives = selectFromScansMinFields().created_at.db_date.distro_name.distro_version.grype_version.project_id.sbom_id.source_type.target

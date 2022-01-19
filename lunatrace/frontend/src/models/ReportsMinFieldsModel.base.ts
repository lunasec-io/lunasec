/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * ReportsMinFieldsBase
 * auto generated base class for the model ReportsMinFieldsModel.
 *
 * aggregate min on columns
 */
export const ReportsMinFieldsModelBase = ModelBase
  .named('ReportsMinFields')
  .props({
    __typename: types.optional(types.literal("reports_min_fields"), "reports_min_fields"),
    db_date: types.union(types.undefined, types.null, types.frozen()),
    distro_name: types.union(types.undefined, types.null, types.string),
    distro_version: types.union(types.undefined, types.null, types.string),
    grype_version: types.union(types.undefined, types.null, types.string),
    id: types.union(types.undefined, types.null, types.frozen()),
    project_id: types.union(types.undefined, types.null, types.frozen()),
    source_type: types.union(types.undefined, types.null, types.string),
    target: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ReportsMinFieldsModelSelector extends QueryBuilder {
  get db_date() { return this.__attr(`db_date`) }
  get distro_name() { return this.__attr(`distro_name`) }
  get distro_version() { return this.__attr(`distro_version`) }
  get grype_version() { return this.__attr(`grype_version`) }
  get id() { return this.__attr(`id`) }
  get project_id() { return this.__attr(`project_id`) }
  get source_type() { return this.__attr(`source_type`) }
  get target() { return this.__attr(`target`) }
}
export function selectFromReportsMinFields() {
  return new ReportsMinFieldsModelSelector()
}

export const reportsMinFieldsModelPrimitives = selectFromReportsMinFields().db_date.distro_name.distro_version.grype_version.project_id.source_type.target

/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * ReportsMaxFieldsBase
 * auto generated base class for the model ReportsMaxFieldsModel.
 *
 * aggregate max on columns
 */
export const ReportsMaxFieldsModelBase = ModelBase
  .named('ReportsMaxFields')
  .props({
    __typename: types.optional(types.literal("reports_max_fields"), "reports_max_fields"),
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

export class ReportsMaxFieldsModelSelector extends QueryBuilder {
  get db_date() { return this.__attr(`db_date`) }
  get distro_name() { return this.__attr(`distro_name`) }
  get distro_version() { return this.__attr(`distro_version`) }
  get grype_version() { return this.__attr(`grype_version`) }
  get id() { return this.__attr(`id`) }
  get project_id() { return this.__attr(`project_id`) }
  get source_type() { return this.__attr(`source_type`) }
  get target() { return this.__attr(`target`) }
}
export function selectFromReportsMaxFields() {
  return new ReportsMaxFieldsModelSelector()
}

export const reportsMaxFieldsModelPrimitives = selectFromReportsMaxFields().db_date.distro_name.distro_version.grype_version.project_id.source_type.target

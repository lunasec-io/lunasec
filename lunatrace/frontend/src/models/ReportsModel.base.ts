/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { FindingsAggregateModel, FindingsAggregateModelType } from "./FindingsAggregateModel"
import { FindingsAggregateModelSelector } from "./FindingsAggregateModel.base"
import { FindingsModel, FindingsModelType } from "./FindingsModel"
import { FindingsModelSelector } from "./FindingsModel.base"
import { ProjectsModel, ProjectsModelType } from "./ProjectsModel"
import { ProjectsModelSelector } from "./ProjectsModel.base"
import { RootStoreType } from "./index"


/**
 * ReportsBase
 * auto generated base class for the model ReportsModel.
 *
 * scan reports   columns and relationships of "reports"
 */
export const ReportsModelBase = ModelBase
  .named('Reports')
  .props({
    __typename: types.optional(types.literal("reports"), "reports"),
    db_date: types.union(types.undefined, types.frozen()),
    distro_name: types.union(types.undefined, types.string),
    distro_version: types.union(types.undefined, types.string),
    /** An array relationship */
    findings: types.union(types.undefined, types.array(types.late((): any => FindingsModel))),
    /** An aggregate relationship */
    findings_aggregate: types.union(types.undefined, types.late((): any => FindingsAggregateModel)),
    grype_version: types.union(types.undefined, types.string),
    id: types.union(types.undefined, types.frozen()),
    /** An object relationship */
    project: types.union(types.undefined, types.late((): any => ProjectsModel)),
    project_id: types.union(types.undefined, types.frozen()),
    source_type: types.union(types.undefined, types.string),
    target: types.union(types.undefined, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ReportsModelSelector extends QueryBuilder {
  get db_date() { return this.__attr(`db_date`) }
  get distro_name() { return this.__attr(`distro_name`) }
  get distro_version() { return this.__attr(`distro_version`) }
  get grype_version() { return this.__attr(`grype_version`) }
  get id() { return this.__attr(`id`) }
  get project_id() { return this.__attr(`project_id`) }
  get source_type() { return this.__attr(`source_type`) }
  get target() { return this.__attr(`target`) }
  findings(builder?: string | FindingsModelSelector | ((selector: FindingsModelSelector) => FindingsModelSelector)) { return this.__child(`findings`, FindingsModelSelector, builder) }
  findings_aggregate(builder?: string | FindingsAggregateModelSelector | ((selector: FindingsAggregateModelSelector) => FindingsAggregateModelSelector)) { return this.__child(`findings_aggregate`, FindingsAggregateModelSelector, builder) }
  project(builder?: string | ProjectsModelSelector | ((selector: ProjectsModelSelector) => ProjectsModelSelector)) { return this.__child(`project`, ProjectsModelSelector, builder) }
}
export function selectFromReports() {
  return new ReportsModelSelector()
}

export const reportsModelPrimitives = selectFromReports().db_date.distro_name.distro_version.grype_version.project_id.source_type.target

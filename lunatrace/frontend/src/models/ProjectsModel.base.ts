/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { OrganizationsModel, OrganizationsModelType } from "./OrganizationsModel"
import { OrganizationsModelSelector } from "./OrganizationsModel.base"
import { ReportsAggregateModel, ReportsAggregateModelType } from "./ReportsAggregateModel"
import { ReportsAggregateModelSelector } from "./ReportsAggregateModel.base"
import { ReportsModel, ReportsModelType } from "./ReportsModel"
import { ReportsModelSelector } from "./ReportsModel.base"
import { ScansAggregateModel, ScansAggregateModelType } from "./ScansAggregateModel"
import { ScansAggregateModelSelector } from "./ScansAggregateModel.base"
import { ScansModel, ScansModelType } from "./ScansModel"
import { ScansModelSelector } from "./ScansModel.base"
import { RootStoreType } from "./index"


/**
 * ProjectsBase
 * auto generated base class for the model ProjectsModel.
 *
 * columns and relationships of "projects"
 */
export const ProjectsModelBase = ModelBase
  .named('Projects')
  .props({
    __typename: types.optional(types.literal("projects"), "projects"),
    created_at: types.union(types.undefined, types.frozen()),
    id: types.union(types.undefined, types.frozen()),
    name: types.union(types.undefined, types.string),
    /** An object relationship */
    organization: types.union(types.undefined, types.null, types.late((): any => OrganizationsModel)),
    organization_id: types.union(types.undefined, types.null, types.frozen()),
    repo: types.union(types.undefined, types.null, types.string),
    /** fetch data from the table: "reports" */
    reports: types.union(types.undefined, types.array(types.late((): any => ReportsModel))),
    /** An aggregate relationship */
    reports_aggregate: types.union(types.undefined, types.late((): any => ReportsAggregateModel)),
    /** An array relationship */
    scans: types.union(types.undefined, types.array(types.late((): any => ScansModel))),
    /** An aggregate relationship */
    scans_aggregate: types.union(types.undefined, types.late((): any => ScansAggregateModel)),
    settings_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ProjectsModelSelector extends QueryBuilder {
  get created_at() { return this.__attr(`created_at`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get organization_id() { return this.__attr(`organization_id`) }
  get repo() { return this.__attr(`repo`) }
  get settings_id() { return this.__attr(`settings_id`) }
  organization(builder?: string | OrganizationsModelSelector | ((selector: OrganizationsModelSelector) => OrganizationsModelSelector)) { return this.__child(`organization`, OrganizationsModelSelector, builder) }
  reports(builder?: string | ReportsModelSelector | ((selector: ReportsModelSelector) => ReportsModelSelector)) { return this.__child(`reports`, ReportsModelSelector, builder) }
  reports_aggregate(builder?: string | ReportsAggregateModelSelector | ((selector: ReportsAggregateModelSelector) => ReportsAggregateModelSelector)) { return this.__child(`reports_aggregate`, ReportsAggregateModelSelector, builder) }
  scans(builder?: string | ScansModelSelector | ((selector: ScansModelSelector) => ScansModelSelector)) { return this.__child(`scans`, ScansModelSelector, builder) }
  scans_aggregate(builder?: string | ScansAggregateModelSelector | ((selector: ScansAggregateModelSelector) => ScansAggregateModelSelector)) { return this.__child(`scans_aggregate`, ScansAggregateModelSelector, builder) }
}
export function selectFromProjects() {
  return new ProjectsModelSelector()
}

export const projectsModelPrimitives = selectFromProjects().created_at.name.organization_id.repo.settings_id

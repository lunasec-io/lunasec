/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ProjectsMaxFieldsModel, ProjectsMaxFieldsModelType } from "./ProjectsMaxFieldsModel"
import { ProjectsMaxFieldsModelSelector } from "./ProjectsMaxFieldsModel.base"
import { ProjectsMinFieldsModel, ProjectsMinFieldsModelType } from "./ProjectsMinFieldsModel"
import { ProjectsMinFieldsModelSelector } from "./ProjectsMinFieldsModel.base"
import { RootStoreType } from "./index"


/**
 * ProjectsAggregateFieldsBase
 * auto generated base class for the model ProjectsAggregateFieldsModel.
 *
 * aggregate fields of "projects"
 */
export const ProjectsAggregateFieldsModelBase = ModelBase
  .named('ProjectsAggregateFields')
  .props({
    __typename: types.optional(types.literal("projects_aggregate_fields"), "projects_aggregate_fields"),
    count: types.union(types.undefined, types.integer),
    max: types.union(types.undefined, types.null, types.late((): any => ProjectsMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late((): any => ProjectsMinFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ProjectsAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  max(builder?: string | ProjectsMaxFieldsModelSelector | ((selector: ProjectsMaxFieldsModelSelector) => ProjectsMaxFieldsModelSelector)) { return this.__child(`max`, ProjectsMaxFieldsModelSelector, builder) }
  min(builder?: string | ProjectsMinFieldsModelSelector | ((selector: ProjectsMinFieldsModelSelector) => ProjectsMinFieldsModelSelector)) { return this.__child(`min`, ProjectsMinFieldsModelSelector, builder) }
}
export function selectFromProjectsAggregateFields() {
  return new ProjectsAggregateFieldsModelSelector()
}

export const projectsAggregateFieldsModelPrimitives = selectFromProjectsAggregateFields().count

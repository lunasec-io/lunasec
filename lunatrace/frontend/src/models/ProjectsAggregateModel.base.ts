/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ProjectsAggregateFieldsModel, ProjectsAggregateFieldsModelType } from "./ProjectsAggregateFieldsModel"
import { ProjectsAggregateFieldsModelSelector } from "./ProjectsAggregateFieldsModel.base"
import { ProjectsModel, ProjectsModelType } from "./ProjectsModel"
import { ProjectsModelSelector } from "./ProjectsModel.base"
import { RootStoreType } from "./index"


/**
 * ProjectsAggregateBase
 * auto generated base class for the model ProjectsAggregateModel.
 *
 * aggregated selection of "projects"
 */
export const ProjectsAggregateModelBase = ModelBase
  .named('ProjectsAggregate')
  .props({
    __typename: types.optional(types.literal("projects_aggregate"), "projects_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late((): any => ProjectsAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late((): any => ProjectsModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ProjectsAggregateModelSelector extends QueryBuilder {
  aggregate(builder?: string | ProjectsAggregateFieldsModelSelector | ((selector: ProjectsAggregateFieldsModelSelector) => ProjectsAggregateFieldsModelSelector)) { return this.__child(`aggregate`, ProjectsAggregateFieldsModelSelector, builder) }
  nodes(builder?: string | ProjectsModelSelector | ((selector: ProjectsModelSelector) => ProjectsModelSelector)) { return this.__child(`nodes`, ProjectsModelSelector, builder) }
}
export function selectFromProjectsAggregate() {
  return new ProjectsAggregateModelSelector()
}

export const projectsAggregateModelPrimitives = selectFromProjectsAggregate()

/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ProjectsModel, ProjectsModelType } from "./ProjectsModel"
import { ProjectsModelSelector } from "./ProjectsModel.base"
import { RootStoreType } from "./index"


/**
 * ProjectsMutationResponseBase
 * auto generated base class for the model ProjectsMutationResponseModel.
 *
 * response of any mutation on the table "projects"
 */
export const ProjectsMutationResponseModelBase = ModelBase
  .named('ProjectsMutationResponse')
  .props({
    __typename: types.optional(types.literal("projects_mutation_response"), "projects_mutation_response"),
    /** number of rows affected by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data from the rows affected by the mutation */
    returning: types.union(types.undefined, types.array(types.late((): any => ProjectsModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ProjectsMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder?: string | ProjectsModelSelector | ((selector: ProjectsModelSelector) => ProjectsModelSelector)) { return this.__child(`returning`, ProjectsModelSelector, builder) }
}
export function selectFromProjectsMutationResponse() {
  return new ProjectsMutationResponseModelSelector()
}

export const projectsMutationResponseModelPrimitives = selectFromProjectsMutationResponse().affected_rows

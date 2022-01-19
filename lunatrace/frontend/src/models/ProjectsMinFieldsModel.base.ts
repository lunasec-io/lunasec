/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * ProjectsMinFieldsBase
 * auto generated base class for the model ProjectsMinFieldsModel.
 *
 * aggregate min on columns
 */
export const ProjectsMinFieldsModelBase = ModelBase
  .named('ProjectsMinFields')
  .props({
    __typename: types.optional(types.literal("projects_min_fields"), "projects_min_fields"),
    created_at: types.union(types.undefined, types.null, types.frozen()),
    id: types.union(types.undefined, types.null, types.frozen()),
    name: types.union(types.undefined, types.null, types.string),
    organization_id: types.union(types.undefined, types.null, types.frozen()),
    repo: types.union(types.undefined, types.null, types.string),
    settings_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ProjectsMinFieldsModelSelector extends QueryBuilder {
  get created_at() { return this.__attr(`created_at`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get organization_id() { return this.__attr(`organization_id`) }
  get repo() { return this.__attr(`repo`) }
  get settings_id() { return this.__attr(`settings_id`) }
}
export function selectFromProjectsMinFields() {
  return new ProjectsMinFieldsModelSelector()
}

export const projectsMinFieldsModelPrimitives = selectFromProjectsMinFields().created_at.name.organization_id.repo.settings_id

/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { OrganizationUserAggregateModel, OrganizationUserAggregateModelType } from "./OrganizationUserAggregateModel"
import { OrganizationUserAggregateModelSelector } from "./OrganizationUserAggregateModel.base"
import { OrganizationUserModel, OrganizationUserModelType } from "./OrganizationUserModel"
import { OrganizationUserModelSelector } from "./OrganizationUserModel.base"
import { ProjectsAggregateModel, ProjectsAggregateModelType } from "./ProjectsAggregateModel"
import { ProjectsAggregateModelSelector } from "./ProjectsAggregateModel.base"
import { ProjectsModel, ProjectsModelType } from "./ProjectsModel"
import { ProjectsModelSelector } from "./ProjectsModel.base"
import { RootStoreType } from "./index"


/**
 * OrganizationsBase
 * auto generated base class for the model OrganizationsModel.
 *
 * columns and relationships of "organizations"
 */
export const OrganizationsModelBase = ModelBase
  .named('Organizations')
  .props({
    __typename: types.optional(types.literal("organizations"), "organizations"),
    createdAt: types.union(types.undefined, types.frozen()),
    id: types.union(types.undefined, types.frozen()),
    name: types.union(types.undefined, types.string),
    /** An array relationship */
    organization_users: types.union(types.undefined, types.array(types.late((): any => OrganizationUserModel))),
    /** An aggregate relationship */
    organization_users_aggregate: types.union(types.undefined, types.late((): any => OrganizationUserAggregateModel)),
    /** An array relationship */
    projects: types.union(types.undefined, types.array(types.late((): any => ProjectsModel))),
    /** An aggregate relationship */
    projects_aggregate: types.union(types.undefined, types.late((): any => ProjectsAggregateModel)),
    settings_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class OrganizationsModelSelector extends QueryBuilder {
  get createdAt() { return this.__attr(`createdAt`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get settings_id() { return this.__attr(`settings_id`) }
  organization_users(builder?: string | OrganizationUserModelSelector | ((selector: OrganizationUserModelSelector) => OrganizationUserModelSelector)) { return this.__child(`organization_users`, OrganizationUserModelSelector, builder) }
  organization_users_aggregate(builder?: string | OrganizationUserAggregateModelSelector | ((selector: OrganizationUserAggregateModelSelector) => OrganizationUserAggregateModelSelector)) { return this.__child(`organization_users_aggregate`, OrganizationUserAggregateModelSelector, builder) }
  projects(builder?: string | ProjectsModelSelector | ((selector: ProjectsModelSelector) => ProjectsModelSelector)) { return this.__child(`projects`, ProjectsModelSelector, builder) }
  projects_aggregate(builder?: string | ProjectsAggregateModelSelector | ((selector: ProjectsAggregateModelSelector) => ProjectsAggregateModelSelector)) { return this.__child(`projects_aggregate`, ProjectsAggregateModelSelector, builder) }
}
export function selectFromOrganizations() {
  return new OrganizationsModelSelector()
}

export const organizationsModelPrimitives = selectFromOrganizations().createdAt.name.settings_id

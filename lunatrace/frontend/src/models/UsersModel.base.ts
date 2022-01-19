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
import { RootStoreType } from "./index"


/**
 * UsersBase
 * auto generated base class for the model UsersModel.
 *
 * columns and relationships of "users"
 */
export const UsersModelBase = ModelBase
  .named('Users')
  .props({
    __typename: types.optional(types.literal("users"), "users"),
    created_at: types.union(types.undefined, types.frozen()),
    email: types.union(types.undefined, types.string),
    id: types.union(types.undefined, types.frozen()),
    name: types.union(types.undefined, types.string),
    /** An array relationship */
    organization_users: types.union(types.undefined, types.array(types.late((): any => OrganizationUserModel))),
    /** An aggregate relationship */
    organization_users_aggregate: types.union(types.undefined, types.late((): any => OrganizationUserAggregateModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class UsersModelSelector extends QueryBuilder {
  get created_at() { return this.__attr(`created_at`) }
  get email() { return this.__attr(`email`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  organization_users(builder?: string | OrganizationUserModelSelector | ((selector: OrganizationUserModelSelector) => OrganizationUserModelSelector)) { return this.__child(`organization_users`, OrganizationUserModelSelector, builder) }
  organization_users_aggregate(builder?: string | OrganizationUserAggregateModelSelector | ((selector: OrganizationUserAggregateModelSelector) => OrganizationUserAggregateModelSelector)) { return this.__child(`organization_users_aggregate`, OrganizationUserAggregateModelSelector, builder) }
}
export function selectFromUsers() {
  return new UsersModelSelector()
}

export const usersModelPrimitives = selectFromUsers().created_at.email.name

/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * UsersMaxFieldsBase
 * auto generated base class for the model UsersMaxFieldsModel.
 *
 * aggregate max on columns
 */
export const UsersMaxFieldsModelBase = ModelBase
  .named('UsersMaxFields')
  .props({
    __typename: types.optional(types.literal("users_max_fields"), "users_max_fields"),
    created_at: types.union(types.undefined, types.null, types.frozen()),
    email: types.union(types.undefined, types.null, types.string),
    id: types.union(types.undefined, types.null, types.frozen()),
    name: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class UsersMaxFieldsModelSelector extends QueryBuilder {
  get created_at() { return this.__attr(`created_at`) }
  get email() { return this.__attr(`email`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
}
export function selectFromUsersMaxFields() {
  return new UsersMaxFieldsModelSelector()
}

export const usersMaxFieldsModelPrimitives = selectFromUsersMaxFields().created_at.email.name

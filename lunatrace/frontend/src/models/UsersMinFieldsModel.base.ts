/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * UsersMinFieldsBase
 * auto generated base class for the model UsersMinFieldsModel.
 *
 * aggregate min on columns
 */
export const UsersMinFieldsModelBase = ModelBase
  .named('UsersMinFields')
  .props({
    __typename: types.optional(types.literal("users_min_fields"), "users_min_fields"),
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

export class UsersMinFieldsModelSelector extends QueryBuilder {
  get created_at() { return this.__attr(`created_at`) }
  get email() { return this.__attr(`email`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
}
export function selectFromUsersMinFields() {
  return new UsersMinFieldsModelSelector()
}

export const usersMinFieldsModelPrimitives = selectFromUsersMinFields().created_at.email.name

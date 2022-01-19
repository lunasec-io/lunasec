/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { UsersMaxFieldsModel, UsersMaxFieldsModelType } from "./UsersMaxFieldsModel"
import { UsersMaxFieldsModelSelector } from "./UsersMaxFieldsModel.base"
import { UsersMinFieldsModel, UsersMinFieldsModelType } from "./UsersMinFieldsModel"
import { UsersMinFieldsModelSelector } from "./UsersMinFieldsModel.base"
import { RootStoreType } from "./index"


/**
 * UsersAggregateFieldsBase
 * auto generated base class for the model UsersAggregateFieldsModel.
 *
 * aggregate fields of "users"
 */
export const UsersAggregateFieldsModelBase = ModelBase
  .named('UsersAggregateFields')
  .props({
    __typename: types.optional(types.literal("users_aggregate_fields"), "users_aggregate_fields"),
    count: types.union(types.undefined, types.integer),
    max: types.union(types.undefined, types.null, types.late((): any => UsersMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late((): any => UsersMinFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class UsersAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  max(builder?: string | UsersMaxFieldsModelSelector | ((selector: UsersMaxFieldsModelSelector) => UsersMaxFieldsModelSelector)) { return this.__child(`max`, UsersMaxFieldsModelSelector, builder) }
  min(builder?: string | UsersMinFieldsModelSelector | ((selector: UsersMinFieldsModelSelector) => UsersMinFieldsModelSelector)) { return this.__child(`min`, UsersMinFieldsModelSelector, builder) }
}
export function selectFromUsersAggregateFields() {
  return new UsersAggregateFieldsModelSelector()
}

export const usersAggregateFieldsModelPrimitives = selectFromUsersAggregateFields().count

/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { UsersAggregateFieldsModel, UsersAggregateFieldsModelType } from "./UsersAggregateFieldsModel"
import { UsersAggregateFieldsModelSelector } from "./UsersAggregateFieldsModel.base"
import { UsersModel, UsersModelType } from "./UsersModel"
import { UsersModelSelector } from "./UsersModel.base"
import { RootStoreType } from "./index"


/**
 * UsersAggregateBase
 * auto generated base class for the model UsersAggregateModel.
 *
 * aggregated selection of "users"
 */
export const UsersAggregateModelBase = ModelBase
  .named('UsersAggregate')
  .props({
    __typename: types.optional(types.literal("users_aggregate"), "users_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late((): any => UsersAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late((): any => UsersModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class UsersAggregateModelSelector extends QueryBuilder {
  aggregate(builder?: string | UsersAggregateFieldsModelSelector | ((selector: UsersAggregateFieldsModelSelector) => UsersAggregateFieldsModelSelector)) { return this.__child(`aggregate`, UsersAggregateFieldsModelSelector, builder) }
  nodes(builder?: string | UsersModelSelector | ((selector: UsersModelSelector) => UsersModelSelector)) { return this.__child(`nodes`, UsersModelSelector, builder) }
}
export function selectFromUsersAggregate() {
  return new UsersAggregateModelSelector()
}

export const usersAggregateModelPrimitives = selectFromUsersAggregate()

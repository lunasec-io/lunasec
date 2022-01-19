/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { UsersModel, UsersModelType } from "./UsersModel"
import { UsersModelSelector } from "./UsersModel.base"
import { RootStoreType } from "./index"


/**
 * UsersMutationResponseBase
 * auto generated base class for the model UsersMutationResponseModel.
 *
 * response of any mutation on the table "users"
 */
export const UsersMutationResponseModelBase = ModelBase
  .named('UsersMutationResponse')
  .props({
    __typename: types.optional(types.literal("users_mutation_response"), "users_mutation_response"),
    /** number of rows affected by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data from the rows affected by the mutation */
    returning: types.union(types.undefined, types.array(types.late((): any => UsersModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class UsersMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder?: string | UsersModelSelector | ((selector: UsersModelSelector) => UsersModelSelector)) { return this.__child(`returning`, UsersModelSelector, builder) }
}
export function selectFromUsersMutationResponse() {
  return new UsersMutationResponseModelSelector()
}

export const usersMutationResponseModelPrimitives = selectFromUsersMutationResponse().affected_rows

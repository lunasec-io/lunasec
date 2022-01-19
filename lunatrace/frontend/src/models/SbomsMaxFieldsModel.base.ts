/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * SbomsMaxFieldsBase
 * auto generated base class for the model SbomsMaxFieldsModel.
 *
 * aggregate max on columns
 */
export const SbomsMaxFieldsModelBase = ModelBase
  .named('SbomsMaxFields')
  .props({
    __typename: types.optional(types.literal("sboms_max_fields"), "sboms_max_fields"),
    created_at: types.union(types.undefined, types.null, types.frozen()),
    id: types.union(types.undefined, types.null, types.frozen()),
    s3_url: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class SbomsMaxFieldsModelSelector extends QueryBuilder {
  get created_at() { return this.__attr(`created_at`) }
  get id() { return this.__attr(`id`) }
  get s3_url() { return this.__attr(`s3_url`) }
}
export function selectFromSbomsMaxFields() {
  return new SbomsMaxFieldsModelSelector()
}

export const sbomsMaxFieldsModelPrimitives = selectFromSbomsMaxFields().created_at.s3_url

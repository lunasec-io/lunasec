/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { SbomsMaxFieldsModel, SbomsMaxFieldsModelType } from "./SbomsMaxFieldsModel"
import { SbomsMaxFieldsModelSelector } from "./SbomsMaxFieldsModel.base"
import { SbomsMinFieldsModel, SbomsMinFieldsModelType } from "./SbomsMinFieldsModel"
import { SbomsMinFieldsModelSelector } from "./SbomsMinFieldsModel.base"
import { RootStoreType } from "./index"


/**
 * SbomsAggregateFieldsBase
 * auto generated base class for the model SbomsAggregateFieldsModel.
 *
 * aggregate fields of "sboms"
 */
export const SbomsAggregateFieldsModelBase = ModelBase
  .named('SbomsAggregateFields')
  .props({
    __typename: types.optional(types.literal("sboms_aggregate_fields"), "sboms_aggregate_fields"),
    count: types.union(types.undefined, types.integer),
    max: types.union(types.undefined, types.null, types.late((): any => SbomsMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late((): any => SbomsMinFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class SbomsAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  max(builder?: string | SbomsMaxFieldsModelSelector | ((selector: SbomsMaxFieldsModelSelector) => SbomsMaxFieldsModelSelector)) { return this.__child(`max`, SbomsMaxFieldsModelSelector, builder) }
  min(builder?: string | SbomsMinFieldsModelSelector | ((selector: SbomsMinFieldsModelSelector) => SbomsMinFieldsModelSelector)) { return this.__child(`min`, SbomsMinFieldsModelSelector, builder) }
}
export function selectFromSbomsAggregateFields() {
  return new SbomsAggregateFieldsModelSelector()
}

export const sbomsAggregateFieldsModelPrimitives = selectFromSbomsAggregateFields().count

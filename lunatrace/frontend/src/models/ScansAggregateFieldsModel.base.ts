/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ScansMaxFieldsModel, ScansMaxFieldsModelType } from "./ScansMaxFieldsModel"
import { ScansMaxFieldsModelSelector } from "./ScansMaxFieldsModel.base"
import { ScansMinFieldsModel, ScansMinFieldsModelType } from "./ScansMinFieldsModel"
import { ScansMinFieldsModelSelector } from "./ScansMinFieldsModel.base"
import { RootStoreType } from "./index"


/**
 * ScansAggregateFieldsBase
 * auto generated base class for the model ScansAggregateFieldsModel.
 *
 * aggregate fields of "scans"
 */
export const ScansAggregateFieldsModelBase = ModelBase
  .named('ScansAggregateFields')
  .props({
    __typename: types.optional(types.literal("scans_aggregate_fields"), "scans_aggregate_fields"),
    count: types.union(types.undefined, types.integer),
    max: types.union(types.undefined, types.null, types.late((): any => ScansMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late((): any => ScansMinFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ScansAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  max(builder?: string | ScansMaxFieldsModelSelector | ((selector: ScansMaxFieldsModelSelector) => ScansMaxFieldsModelSelector)) { return this.__child(`max`, ScansMaxFieldsModelSelector, builder) }
  min(builder?: string | ScansMinFieldsModelSelector | ((selector: ScansMinFieldsModelSelector) => ScansMinFieldsModelSelector)) { return this.__child(`min`, ScansMinFieldsModelSelector, builder) }
}
export function selectFromScansAggregateFields() {
  return new ScansAggregateFieldsModelSelector()
}

export const scansAggregateFieldsModelPrimitives = selectFromScansAggregateFields().count

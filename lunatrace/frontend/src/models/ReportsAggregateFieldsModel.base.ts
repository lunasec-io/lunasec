/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ReportsMaxFieldsModel, ReportsMaxFieldsModelType } from "./ReportsMaxFieldsModel"
import { ReportsMaxFieldsModelSelector } from "./ReportsMaxFieldsModel.base"
import { ReportsMinFieldsModel, ReportsMinFieldsModelType } from "./ReportsMinFieldsModel"
import { ReportsMinFieldsModelSelector } from "./ReportsMinFieldsModel.base"
import { RootStoreType } from "./index"


/**
 * ReportsAggregateFieldsBase
 * auto generated base class for the model ReportsAggregateFieldsModel.
 *
 * aggregate fields of "reports"
 */
export const ReportsAggregateFieldsModelBase = ModelBase
  .named('ReportsAggregateFields')
  .props({
    __typename: types.optional(types.literal("reports_aggregate_fields"), "reports_aggregate_fields"),
    count: types.union(types.undefined, types.integer),
    max: types.union(types.undefined, types.null, types.late((): any => ReportsMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late((): any => ReportsMinFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ReportsAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  max(builder?: string | ReportsMaxFieldsModelSelector | ((selector: ReportsMaxFieldsModelSelector) => ReportsMaxFieldsModelSelector)) { return this.__child(`max`, ReportsMaxFieldsModelSelector, builder) }
  min(builder?: string | ReportsMinFieldsModelSelector | ((selector: ReportsMinFieldsModelSelector) => ReportsMinFieldsModelSelector)) { return this.__child(`min`, ReportsMinFieldsModelSelector, builder) }
}
export function selectFromReportsAggregateFields() {
  return new ReportsAggregateFieldsModelSelector()
}

export const reportsAggregateFieldsModelPrimitives = selectFromReportsAggregateFields().count

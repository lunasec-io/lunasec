/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ReportsAggregateFieldsModel, ReportsAggregateFieldsModelType } from "./ReportsAggregateFieldsModel"
import { ReportsAggregateFieldsModelSelector } from "./ReportsAggregateFieldsModel.base"
import { ReportsModel, ReportsModelType } from "./ReportsModel"
import { ReportsModelSelector } from "./ReportsModel.base"
import { RootStoreType } from "./index"


/**
 * ReportsAggregateBase
 * auto generated base class for the model ReportsAggregateModel.
 *
 * aggregated selection of "reports"
 */
export const ReportsAggregateModelBase = ModelBase
  .named('ReportsAggregate')
  .props({
    __typename: types.optional(types.literal("reports_aggregate"), "reports_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late((): any => ReportsAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late((): any => ReportsModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ReportsAggregateModelSelector extends QueryBuilder {
  aggregate(builder?: string | ReportsAggregateFieldsModelSelector | ((selector: ReportsAggregateFieldsModelSelector) => ReportsAggregateFieldsModelSelector)) { return this.__child(`aggregate`, ReportsAggregateFieldsModelSelector, builder) }
  nodes(builder?: string | ReportsModelSelector | ((selector: ReportsModelSelector) => ReportsModelSelector)) { return this.__child(`nodes`, ReportsModelSelector, builder) }
}
export function selectFromReportsAggregate() {
  return new ReportsAggregateModelSelector()
}

export const reportsAggregateModelPrimitives = selectFromReportsAggregate()

/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ScansAggregateFieldsModel, ScansAggregateFieldsModelType } from "./ScansAggregateFieldsModel"
import { ScansAggregateFieldsModelSelector } from "./ScansAggregateFieldsModel.base"
import { ScansModel, ScansModelType } from "./ScansModel"
import { ScansModelSelector } from "./ScansModel.base"
import { RootStoreType } from "./index"


/**
 * ScansAggregateBase
 * auto generated base class for the model ScansAggregateModel.
 *
 * aggregated selection of "scans"
 */
export const ScansAggregateModelBase = ModelBase
  .named('ScansAggregate')
  .props({
    __typename: types.optional(types.literal("scans_aggregate"), "scans_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late((): any => ScansAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late((): any => ScansModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ScansAggregateModelSelector extends QueryBuilder {
  aggregate(builder?: string | ScansAggregateFieldsModelSelector | ((selector: ScansAggregateFieldsModelSelector) => ScansAggregateFieldsModelSelector)) { return this.__child(`aggregate`, ScansAggregateFieldsModelSelector, builder) }
  nodes(builder?: string | ScansModelSelector | ((selector: ScansModelSelector) => ScansModelSelector)) { return this.__child(`nodes`, ScansModelSelector, builder) }
}
export function selectFromScansAggregate() {
  return new ScansAggregateModelSelector()
}

export const scansAggregateModelPrimitives = selectFromScansAggregate()

/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { FindingsAggregateFieldsModel, FindingsAggregateFieldsModelType } from "./FindingsAggregateFieldsModel"
import { FindingsAggregateFieldsModelSelector } from "./FindingsAggregateFieldsModel.base"
import { FindingsModel, FindingsModelType } from "./FindingsModel"
import { FindingsModelSelector } from "./FindingsModel.base"
import { RootStoreType } from "./index"


/**
 * FindingsAggregateBase
 * auto generated base class for the model FindingsAggregateModel.
 *
 * aggregated selection of "findings"
 */
export const FindingsAggregateModelBase = ModelBase
  .named('FindingsAggregate')
  .props({
    __typename: types.optional(types.literal("findings_aggregate"), "findings_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late((): any => FindingsAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late((): any => FindingsModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class FindingsAggregateModelSelector extends QueryBuilder {
  aggregate(builder?: string | FindingsAggregateFieldsModelSelector | ((selector: FindingsAggregateFieldsModelSelector) => FindingsAggregateFieldsModelSelector)) { return this.__child(`aggregate`, FindingsAggregateFieldsModelSelector, builder) }
  nodes(builder?: string | FindingsModelSelector | ((selector: FindingsModelSelector) => FindingsModelSelector)) { return this.__child(`nodes`, FindingsModelSelector, builder) }
}
export function selectFromFindingsAggregate() {
  return new FindingsAggregateModelSelector()
}

export const findingsAggregateModelPrimitives = selectFromFindingsAggregate()

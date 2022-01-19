/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { SbomsAggregateFieldsModel, SbomsAggregateFieldsModelType } from "./SbomsAggregateFieldsModel"
import { SbomsAggregateFieldsModelSelector } from "./SbomsAggregateFieldsModel.base"
import { SbomsModel, SbomsModelType } from "./SbomsModel"
import { SbomsModelSelector } from "./SbomsModel.base"
import { RootStoreType } from "./index"


/**
 * SbomsAggregateBase
 * auto generated base class for the model SbomsAggregateModel.
 *
 * aggregated selection of "sboms"
 */
export const SbomsAggregateModelBase = ModelBase
  .named('SbomsAggregate')
  .props({
    __typename: types.optional(types.literal("sboms_aggregate"), "sboms_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late((): any => SbomsAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late((): any => SbomsModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class SbomsAggregateModelSelector extends QueryBuilder {
  aggregate(builder?: string | SbomsAggregateFieldsModelSelector | ((selector: SbomsAggregateFieldsModelSelector) => SbomsAggregateFieldsModelSelector)) { return this.__child(`aggregate`, SbomsAggregateFieldsModelSelector, builder) }
  nodes(builder?: string | SbomsModelSelector | ((selector: SbomsModelSelector) => SbomsModelSelector)) { return this.__child(`nodes`, SbomsModelSelector, builder) }
}
export function selectFromSbomsAggregate() {
  return new SbomsAggregateModelSelector()
}

export const sbomsAggregateModelPrimitives = selectFromSbomsAggregate()

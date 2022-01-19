/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { VulnerabilitiesAggregateFieldsModel, VulnerabilitiesAggregateFieldsModelType } from "./VulnerabilitiesAggregateFieldsModel"
import { VulnerabilitiesAggregateFieldsModelSelector } from "./VulnerabilitiesAggregateFieldsModel.base"
import { VulnerabilitiesModel, VulnerabilitiesModelType } from "./VulnerabilitiesModel"
import { VulnerabilitiesModelSelector } from "./VulnerabilitiesModel.base"
import { RootStoreType } from "./index"


/**
 * VulnerabilitiesAggregateBase
 * auto generated base class for the model VulnerabilitiesAggregateModel.
 *
 * aggregated selection of "vulnerabilities"
 */
export const VulnerabilitiesAggregateModelBase = ModelBase
  .named('VulnerabilitiesAggregate')
  .props({
    __typename: types.optional(types.literal("vulnerabilities_aggregate"), "vulnerabilities_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late((): any => VulnerabilitiesAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late((): any => VulnerabilitiesModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class VulnerabilitiesAggregateModelSelector extends QueryBuilder {
  aggregate(builder?: string | VulnerabilitiesAggregateFieldsModelSelector | ((selector: VulnerabilitiesAggregateFieldsModelSelector) => VulnerabilitiesAggregateFieldsModelSelector)) { return this.__child(`aggregate`, VulnerabilitiesAggregateFieldsModelSelector, builder) }
  nodes(builder?: string | VulnerabilitiesModelSelector | ((selector: VulnerabilitiesModelSelector) => VulnerabilitiesModelSelector)) { return this.__child(`nodes`, VulnerabilitiesModelSelector, builder) }
}
export function selectFromVulnerabilitiesAggregate() {
  return new VulnerabilitiesAggregateModelSelector()
}

export const vulnerabilitiesAggregateModelPrimitives = selectFromVulnerabilitiesAggregate()

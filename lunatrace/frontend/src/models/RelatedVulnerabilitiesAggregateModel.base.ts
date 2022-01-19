/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RelatedVulnerabilitiesAggregateFieldsModel, RelatedVulnerabilitiesAggregateFieldsModelType } from "./RelatedVulnerabilitiesAggregateFieldsModel"
import { RelatedVulnerabilitiesAggregateFieldsModelSelector } from "./RelatedVulnerabilitiesAggregateFieldsModel.base"
import { RelatedVulnerabilitiesModel, RelatedVulnerabilitiesModelType } from "./RelatedVulnerabilitiesModel"
import { RelatedVulnerabilitiesModelSelector } from "./RelatedVulnerabilitiesModel.base"
import { RootStoreType } from "./index"


/**
 * RelatedVulnerabilitiesAggregateBase
 * auto generated base class for the model RelatedVulnerabilitiesAggregateModel.
 *
 * aggregated selection of "related_vulnerabilities"
 */
export const RelatedVulnerabilitiesAggregateModelBase = ModelBase
  .named('RelatedVulnerabilitiesAggregate')
  .props({
    __typename: types.optional(types.literal("related_vulnerabilities_aggregate"), "related_vulnerabilities_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late((): any => RelatedVulnerabilitiesAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late((): any => RelatedVulnerabilitiesModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class RelatedVulnerabilitiesAggregateModelSelector extends QueryBuilder {
  aggregate(builder?: string | RelatedVulnerabilitiesAggregateFieldsModelSelector | ((selector: RelatedVulnerabilitiesAggregateFieldsModelSelector) => RelatedVulnerabilitiesAggregateFieldsModelSelector)) { return this.__child(`aggregate`, RelatedVulnerabilitiesAggregateFieldsModelSelector, builder) }
  nodes(builder?: string | RelatedVulnerabilitiesModelSelector | ((selector: RelatedVulnerabilitiesModelSelector) => RelatedVulnerabilitiesModelSelector)) { return this.__child(`nodes`, RelatedVulnerabilitiesModelSelector, builder) }
}
export function selectFromRelatedVulnerabilitiesAggregate() {
  return new RelatedVulnerabilitiesAggregateModelSelector()
}

export const relatedVulnerabilitiesAggregateModelPrimitives = selectFromRelatedVulnerabilitiesAggregate()

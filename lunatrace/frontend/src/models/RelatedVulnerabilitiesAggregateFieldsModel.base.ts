/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RelatedVulnerabilitiesMaxFieldsModel, RelatedVulnerabilitiesMaxFieldsModelType } from "./RelatedVulnerabilitiesMaxFieldsModel"
import { RelatedVulnerabilitiesMaxFieldsModelSelector } from "./RelatedVulnerabilitiesMaxFieldsModel.base"
import { RelatedVulnerabilitiesMinFieldsModel, RelatedVulnerabilitiesMinFieldsModelType } from "./RelatedVulnerabilitiesMinFieldsModel"
import { RelatedVulnerabilitiesMinFieldsModelSelector } from "./RelatedVulnerabilitiesMinFieldsModel.base"
import { RootStoreType } from "./index"


/**
 * RelatedVulnerabilitiesAggregateFieldsBase
 * auto generated base class for the model RelatedVulnerabilitiesAggregateFieldsModel.
 *
 * aggregate fields of "related_vulnerabilities"
 */
export const RelatedVulnerabilitiesAggregateFieldsModelBase = ModelBase
  .named('RelatedVulnerabilitiesAggregateFields')
  .props({
    __typename: types.optional(types.literal("related_vulnerabilities_aggregate_fields"), "related_vulnerabilities_aggregate_fields"),
    count: types.union(types.undefined, types.integer),
    max: types.union(types.undefined, types.null, types.late((): any => RelatedVulnerabilitiesMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late((): any => RelatedVulnerabilitiesMinFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class RelatedVulnerabilitiesAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  max(builder?: string | RelatedVulnerabilitiesMaxFieldsModelSelector | ((selector: RelatedVulnerabilitiesMaxFieldsModelSelector) => RelatedVulnerabilitiesMaxFieldsModelSelector)) { return this.__child(`max`, RelatedVulnerabilitiesMaxFieldsModelSelector, builder) }
  min(builder?: string | RelatedVulnerabilitiesMinFieldsModelSelector | ((selector: RelatedVulnerabilitiesMinFieldsModelSelector) => RelatedVulnerabilitiesMinFieldsModelSelector)) { return this.__child(`min`, RelatedVulnerabilitiesMinFieldsModelSelector, builder) }
}
export function selectFromRelatedVulnerabilitiesAggregateFields() {
  return new RelatedVulnerabilitiesAggregateFieldsModelSelector()
}

export const relatedVulnerabilitiesAggregateFieldsModelPrimitives = selectFromRelatedVulnerabilitiesAggregateFields().count

/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RelatedVulnerabilitiesModel, RelatedVulnerabilitiesModelType } from "./RelatedVulnerabilitiesModel"
import { RelatedVulnerabilitiesModelSelector } from "./RelatedVulnerabilitiesModel.base"
import { RootStoreType } from "./index"


/**
 * RelatedVulnerabilitiesMutationResponseBase
 * auto generated base class for the model RelatedVulnerabilitiesMutationResponseModel.
 *
 * response of any mutation on the table "related_vulnerabilities"
 */
export const RelatedVulnerabilitiesMutationResponseModelBase = ModelBase
  .named('RelatedVulnerabilitiesMutationResponse')
  .props({
    __typename: types.optional(types.literal("related_vulnerabilities_mutation_response"), "related_vulnerabilities_mutation_response"),
    /** number of rows affected by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data from the rows affected by the mutation */
    returning: types.union(types.undefined, types.array(types.late((): any => RelatedVulnerabilitiesModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class RelatedVulnerabilitiesMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder?: string | RelatedVulnerabilitiesModelSelector | ((selector: RelatedVulnerabilitiesModelSelector) => RelatedVulnerabilitiesModelSelector)) { return this.__child(`returning`, RelatedVulnerabilitiesModelSelector, builder) }
}
export function selectFromRelatedVulnerabilitiesMutationResponse() {
  return new RelatedVulnerabilitiesMutationResponseModelSelector()
}

export const relatedVulnerabilitiesMutationResponseModelPrimitives = selectFromRelatedVulnerabilitiesMutationResponse().affected_rows

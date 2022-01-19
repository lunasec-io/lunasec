/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { VulnerabilitiesModel, VulnerabilitiesModelType } from "./VulnerabilitiesModel"
import { VulnerabilitiesModelSelector } from "./VulnerabilitiesModel.base"
import { RootStoreType } from "./index"


/**
 * VulnerabilitiesMutationResponseBase
 * auto generated base class for the model VulnerabilitiesMutationResponseModel.
 *
 * response of any mutation on the table "vulnerabilities"
 */
export const VulnerabilitiesMutationResponseModelBase = ModelBase
  .named('VulnerabilitiesMutationResponse')
  .props({
    __typename: types.optional(types.literal("vulnerabilities_mutation_response"), "vulnerabilities_mutation_response"),
    /** number of rows affected by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data from the rows affected by the mutation */
    returning: types.union(types.undefined, types.array(types.late((): any => VulnerabilitiesModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class VulnerabilitiesMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder?: string | VulnerabilitiesModelSelector | ((selector: VulnerabilitiesModelSelector) => VulnerabilitiesModelSelector)) { return this.__child(`returning`, VulnerabilitiesModelSelector, builder) }
}
export function selectFromVulnerabilitiesMutationResponse() {
  return new VulnerabilitiesMutationResponseModelSelector()
}

export const vulnerabilitiesMutationResponseModelPrimitives = selectFromVulnerabilitiesMutationResponse().affected_rows

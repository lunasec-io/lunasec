/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * VulnerabilitiesSumFieldsBase
 * auto generated base class for the model VulnerabilitiesSumFieldsModel.
 *
 * aggregate sum on columns
 */
export const VulnerabilitiesSumFieldsModelBase = ModelBase
  .named('VulnerabilitiesSumFields')
  .props({
    __typename: types.optional(types.literal("vulnerabilities_sum_fields"), "vulnerabilities_sum_fields"),
    cvss_exploitability_score: types.union(types.undefined, types.null, types.frozen()),
    cvss_impact_score: types.union(types.undefined, types.null, types.frozen()),
    cvss_score: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class VulnerabilitiesSumFieldsModelSelector extends QueryBuilder {
  get cvss_exploitability_score() { return this.__attr(`cvss_exploitability_score`) }
  get cvss_impact_score() { return this.__attr(`cvss_impact_score`) }
  get cvss_score() { return this.__attr(`cvss_score`) }
}
export function selectFromVulnerabilitiesSumFields() {
  return new VulnerabilitiesSumFieldsModelSelector()
}

export const vulnerabilitiesSumFieldsModelPrimitives = selectFromVulnerabilitiesSumFields().cvss_exploitability_score.cvss_impact_score.cvss_score

/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * VulnerabilitiesVarPopFieldsBase
 * auto generated base class for the model VulnerabilitiesVarPopFieldsModel.
 *
 * aggregate var_pop on columns
 */
export const VulnerabilitiesVarPopFieldsModelBase = ModelBase
  .named('VulnerabilitiesVarPopFields')
  .props({
    __typename: types.optional(types.literal("vulnerabilities_var_pop_fields"), "vulnerabilities_var_pop_fields"),
    cvss_exploitability_score: types.union(types.undefined, types.null, types.number),
    cvss_impact_score: types.union(types.undefined, types.null, types.number),
    cvss_score: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class VulnerabilitiesVarPopFieldsModelSelector extends QueryBuilder {
  get cvss_exploitability_score() { return this.__attr(`cvss_exploitability_score`) }
  get cvss_impact_score() { return this.__attr(`cvss_impact_score`) }
  get cvss_score() { return this.__attr(`cvss_score`) }
}
export function selectFromVulnerabilitiesVarPopFields() {
  return new VulnerabilitiesVarPopFieldsModelSelector()
}

export const vulnerabilitiesVarPopFieldsModelPrimitives = selectFromVulnerabilitiesVarPopFields().cvss_exploitability_score.cvss_impact_score.cvss_score

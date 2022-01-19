/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * VulnerabilitiesStddevFieldsBase
 * auto generated base class for the model VulnerabilitiesStddevFieldsModel.
 *
 * aggregate stddev on columns
 */
export const VulnerabilitiesStddevFieldsModelBase = ModelBase
  .named('VulnerabilitiesStddevFields')
  .props({
    __typename: types.optional(types.literal("vulnerabilities_stddev_fields"), "vulnerabilities_stddev_fields"),
    cvss_exploitability_score: types.union(types.undefined, types.null, types.number),
    cvss_impact_score: types.union(types.undefined, types.null, types.number),
    cvss_score: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class VulnerabilitiesStddevFieldsModelSelector extends QueryBuilder {
  get cvss_exploitability_score() { return this.__attr(`cvss_exploitability_score`) }
  get cvss_impact_score() { return this.__attr(`cvss_impact_score`) }
  get cvss_score() { return this.__attr(`cvss_score`) }
}
export function selectFromVulnerabilitiesStddevFields() {
  return new VulnerabilitiesStddevFieldsModelSelector()
}

export const vulnerabilitiesStddevFieldsModelPrimitives = selectFromVulnerabilitiesStddevFields().cvss_exploitability_score.cvss_impact_score.cvss_score

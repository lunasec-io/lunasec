/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * VulnerabilitiesMinFieldsBase
 * auto generated base class for the model VulnerabilitiesMinFieldsModel.
 *
 * aggregate min on columns
 */
export const VulnerabilitiesMinFieldsModelBase = ModelBase
  .named('VulnerabilitiesMinFields')
  .props({
    __typename: types.optional(types.literal("vulnerabilities_min_fields"), "vulnerabilities_min_fields"),
    created_at: types.union(types.undefined, types.null, types.frozen()),
    cvss_exploitability_score: types.union(types.undefined, types.null, types.frozen()),
    cvss_impact_score: types.union(types.undefined, types.null, types.frozen()),
    cvss_score: types.union(types.undefined, types.null, types.frozen()),
    cvss_version: types.union(types.undefined, types.null, types.string),
    data_source: types.union(types.undefined, types.null, types.string),
    description: types.union(types.undefined, types.null, types.string),
    id: types.union(types.undefined, types.null, types.frozen()),
    name: types.union(types.undefined, types.null, types.string),
    namespace: types.union(types.undefined, types.null, types.string),
    record_source: types.union(types.undefined, types.null, types.string),
    severity: types.union(types.undefined, types.null, types.string),
    slug: types.union(types.undefined, types.null, types.string),
    topic_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class VulnerabilitiesMinFieldsModelSelector extends QueryBuilder {
  get created_at() { return this.__attr(`created_at`) }
  get cvss_exploitability_score() { return this.__attr(`cvss_exploitability_score`) }
  get cvss_impact_score() { return this.__attr(`cvss_impact_score`) }
  get cvss_score() { return this.__attr(`cvss_score`) }
  get cvss_version() { return this.__attr(`cvss_version`) }
  get data_source() { return this.__attr(`data_source`) }
  get description() { return this.__attr(`description`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get namespace() { return this.__attr(`namespace`) }
  get record_source() { return this.__attr(`record_source`) }
  get severity() { return this.__attr(`severity`) }
  get slug() { return this.__attr(`slug`) }
  get topic_id() { return this.__attr(`topic_id`) }
}
export function selectFromVulnerabilitiesMinFields() {
  return new VulnerabilitiesMinFieldsModelSelector()
}

export const vulnerabilitiesMinFieldsModelPrimitives = selectFromVulnerabilitiesMinFields().created_at.cvss_exploitability_score.cvss_impact_score.cvss_score.cvss_version.data_source.description.name.namespace.record_source.severity.slug.topic_id

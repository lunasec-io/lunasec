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
 * RelatedVulnerabilitiesBase
 * auto generated base class for the model RelatedVulnerabilitiesModel.
 *
 * join table for adding holding additional vulns on a finding   columns and relationships of "related_vulnerabilities"
 */
export const RelatedVulnerabilitiesModelBase = ModelBase
  .named('RelatedVulnerabilities')
  .props({
    __typename: types.optional(types.literal("related_vulnerabilities"), "related_vulnerabilities"),
    id: types.union(types.undefined, types.frozen()),
    related_vulnerability_slug: types.union(types.undefined, types.string),
    /** An object relationship */
    vulnerability: types.union(types.undefined, types.late((): any => VulnerabilitiesModel)),
    /** An object relationship */
    vulnerabilityByVulnerabilitySlug: types.union(types.undefined, types.late((): any => VulnerabilitiesModel)),
    vulnerability_slug: types.union(types.undefined, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class RelatedVulnerabilitiesModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get related_vulnerability_slug() { return this.__attr(`related_vulnerability_slug`) }
  get vulnerability_slug() { return this.__attr(`vulnerability_slug`) }
  vulnerability(builder?: string | VulnerabilitiesModelSelector | ((selector: VulnerabilitiesModelSelector) => VulnerabilitiesModelSelector)) { return this.__child(`vulnerability`, VulnerabilitiesModelSelector, builder) }
  vulnerabilityByVulnerabilitySlug(builder?: string | VulnerabilitiesModelSelector | ((selector: VulnerabilitiesModelSelector) => VulnerabilitiesModelSelector)) { return this.__child(`vulnerabilityByVulnerabilitySlug`, VulnerabilitiesModelSelector, builder) }
}
export function selectFromRelatedVulnerabilities() {
  return new RelatedVulnerabilitiesModelSelector()
}

export const relatedVulnerabilitiesModelPrimitives = selectFromRelatedVulnerabilities().related_vulnerability_slug.vulnerability_slug

/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * RelatedVulnerabilitiesMinFieldsBase
 * auto generated base class for the model RelatedVulnerabilitiesMinFieldsModel.
 *
 * aggregate min on columns
 */
export const RelatedVulnerabilitiesMinFieldsModelBase = ModelBase
  .named('RelatedVulnerabilitiesMinFields')
  .props({
    __typename: types.optional(types.literal("related_vulnerabilities_min_fields"), "related_vulnerabilities_min_fields"),
    id: types.union(types.undefined, types.null, types.frozen()),
    related_vulnerability_slug: types.union(types.undefined, types.null, types.string),
    vulnerability_slug: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class RelatedVulnerabilitiesMinFieldsModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get related_vulnerability_slug() { return this.__attr(`related_vulnerability_slug`) }
  get vulnerability_slug() { return this.__attr(`vulnerability_slug`) }
}
export function selectFromRelatedVulnerabilitiesMinFields() {
  return new RelatedVulnerabilitiesMinFieldsModelSelector()
}

export const relatedVulnerabilitiesMinFieldsModelPrimitives = selectFromRelatedVulnerabilitiesMinFields().related_vulnerability_slug.vulnerability_slug

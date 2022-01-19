/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * RelatedVulnerabilitiesMaxFieldsBase
 * auto generated base class for the model RelatedVulnerabilitiesMaxFieldsModel.
 *
 * aggregate max on columns
 */
export const RelatedVulnerabilitiesMaxFieldsModelBase = ModelBase
  .named('RelatedVulnerabilitiesMaxFields')
  .props({
    __typename: types.optional(types.literal("related_vulnerabilities_max_fields"), "related_vulnerabilities_max_fields"),
    id: types.union(types.undefined, types.null, types.frozen()),
    related_vulnerability_slug: types.union(types.undefined, types.null, types.string),
    vulnerability_slug: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class RelatedVulnerabilitiesMaxFieldsModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get related_vulnerability_slug() { return this.__attr(`related_vulnerability_slug`) }
  get vulnerability_slug() { return this.__attr(`vulnerability_slug`) }
}
export function selectFromRelatedVulnerabilitiesMaxFields() {
  return new RelatedVulnerabilitiesMaxFieldsModelSelector()
}

export const relatedVulnerabilitiesMaxFieldsModelPrimitives = selectFromRelatedVulnerabilitiesMaxFields().related_vulnerability_slug.vulnerability_slug

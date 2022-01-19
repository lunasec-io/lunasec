/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { OrganizationsModel, OrganizationsModelType } from "./OrganizationsModel"
import { OrganizationsModelSelector } from "./OrganizationsModel.base"
import { RootStoreType } from "./index"


/**
 * OrganizationsMutationResponseBase
 * auto generated base class for the model OrganizationsMutationResponseModel.
 *
 * response of any mutation on the table "organizations"
 */
export const OrganizationsMutationResponseModelBase = ModelBase
  .named('OrganizationsMutationResponse')
  .props({
    __typename: types.optional(types.literal("organizations_mutation_response"), "organizations_mutation_response"),
    /** number of rows affected by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data from the rows affected by the mutation */
    returning: types.union(types.undefined, types.array(types.late((): any => OrganizationsModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class OrganizationsMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder?: string | OrganizationsModelSelector | ((selector: OrganizationsModelSelector) => OrganizationsModelSelector)) { return this.__child(`returning`, OrganizationsModelSelector, builder) }
}
export function selectFromOrganizationsMutationResponse() {
  return new OrganizationsMutationResponseModelSelector()
}

export const organizationsMutationResponseModelPrimitives = selectFromOrganizationsMutationResponse().affected_rows

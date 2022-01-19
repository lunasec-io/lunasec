/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { OrganizationUserModel, OrganizationUserModelType } from "./OrganizationUserModel"
import { OrganizationUserModelSelector } from "./OrganizationUserModel.base"
import { RootStoreType } from "./index"


/**
 * OrganizationUserMutationResponseBase
 * auto generated base class for the model OrganizationUserMutationResponseModel.
 *
 * response of any mutation on the table "organization_user"
 */
export const OrganizationUserMutationResponseModelBase = ModelBase
  .named('OrganizationUserMutationResponse')
  .props({
    __typename: types.optional(types.literal("organization_user_mutation_response"), "organization_user_mutation_response"),
    /** number of rows affected by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data from the rows affected by the mutation */
    returning: types.union(types.undefined, types.array(types.late((): any => OrganizationUserModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class OrganizationUserMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder?: string | OrganizationUserModelSelector | ((selector: OrganizationUserModelSelector) => OrganizationUserModelSelector)) { return this.__child(`returning`, OrganizationUserModelSelector, builder) }
}
export function selectFromOrganizationUserMutationResponse() {
  return new OrganizationUserMutationResponseModelSelector()
}

export const organizationUserMutationResponseModelPrimitives = selectFromOrganizationUserMutationResponse().affected_rows

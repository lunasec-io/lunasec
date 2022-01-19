/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * OrganizationUserMaxFieldsBase
 * auto generated base class for the model OrganizationUserMaxFieldsModel.
 *
 * aggregate max on columns
 */
export const OrganizationUserMaxFieldsModelBase = ModelBase
  .named('OrganizationUserMaxFields')
  .props({
    __typename: types.optional(types.literal("organization_user_max_fields"), "organization_user_max_fields"),
    created_at: types.union(types.undefined, types.null, types.frozen()),
    id: types.union(types.undefined, types.null, types.frozen()),
    organization_id: types.union(types.undefined, types.null, types.frozen()),
    updated_at: types.union(types.undefined, types.null, types.frozen()),
    user_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class OrganizationUserMaxFieldsModelSelector extends QueryBuilder {
  get created_at() { return this.__attr(`created_at`) }
  get id() { return this.__attr(`id`) }
  get organization_id() { return this.__attr(`organization_id`) }
  get updated_at() { return this.__attr(`updated_at`) }
  get user_id() { return this.__attr(`user_id`) }
}
export function selectFromOrganizationUserMaxFields() {
  return new OrganizationUserMaxFieldsModelSelector()
}

export const organizationUserMaxFieldsModelPrimitives = selectFromOrganizationUserMaxFields().created_at.organization_id.updated_at.user_id

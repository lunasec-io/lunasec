/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * OrganizationUserMinFieldsBase
 * auto generated base class for the model OrganizationUserMinFieldsModel.
 *
 * aggregate min on columns
 */
export const OrganizationUserMinFieldsModelBase = ModelBase
  .named('OrganizationUserMinFields')
  .props({
    __typename: types.optional(types.literal("organization_user_min_fields"), "organization_user_min_fields"),
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

export class OrganizationUserMinFieldsModelSelector extends QueryBuilder {
  get created_at() { return this.__attr(`created_at`) }
  get id() { return this.__attr(`id`) }
  get organization_id() { return this.__attr(`organization_id`) }
  get updated_at() { return this.__attr(`updated_at`) }
  get user_id() { return this.__attr(`user_id`) }
}
export function selectFromOrganizationUserMinFields() {
  return new OrganizationUserMinFieldsModelSelector()
}

export const organizationUserMinFieldsModelPrimitives = selectFromOrganizationUserMinFields().created_at.organization_id.updated_at.user_id

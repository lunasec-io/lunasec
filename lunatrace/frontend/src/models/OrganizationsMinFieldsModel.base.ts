/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * OrganizationsMinFieldsBase
 * auto generated base class for the model OrganizationsMinFieldsModel.
 *
 * aggregate min on columns
 */
export const OrganizationsMinFieldsModelBase = ModelBase
  .named('OrganizationsMinFields')
  .props({
    __typename: types.optional(types.literal("organizations_min_fields"), "organizations_min_fields"),
    createdAt: types.union(types.undefined, types.null, types.frozen()),
    id: types.union(types.undefined, types.null, types.frozen()),
    name: types.union(types.undefined, types.null, types.string),
    settings_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class OrganizationsMinFieldsModelSelector extends QueryBuilder {
  get createdAt() { return this.__attr(`createdAt`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get settings_id() { return this.__attr(`settings_id`) }
}
export function selectFromOrganizationsMinFields() {
  return new OrganizationsMinFieldsModelSelector()
}

export const organizationsMinFieldsModelPrimitives = selectFromOrganizationsMinFields().createdAt.name.settings_id

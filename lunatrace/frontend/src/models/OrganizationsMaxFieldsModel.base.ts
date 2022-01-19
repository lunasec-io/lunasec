/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * OrganizationsMaxFieldsBase
 * auto generated base class for the model OrganizationsMaxFieldsModel.
 *
 * aggregate max on columns
 */
export const OrganizationsMaxFieldsModelBase = ModelBase
  .named('OrganizationsMaxFields')
  .props({
    __typename: types.optional(types.literal("organizations_max_fields"), "organizations_max_fields"),
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

export class OrganizationsMaxFieldsModelSelector extends QueryBuilder {
  get createdAt() { return this.__attr(`createdAt`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get settings_id() { return this.__attr(`settings_id`) }
}
export function selectFromOrganizationsMaxFields() {
  return new OrganizationsMaxFieldsModelSelector()
}

export const organizationsMaxFieldsModelPrimitives = selectFromOrganizationsMaxFields().createdAt.name.settings_id

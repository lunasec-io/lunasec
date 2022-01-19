/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { OrganizationsMaxFieldsModel, OrganizationsMaxFieldsModelType } from "./OrganizationsMaxFieldsModel"
import { OrganizationsMaxFieldsModelSelector } from "./OrganizationsMaxFieldsModel.base"
import { OrganizationsMinFieldsModel, OrganizationsMinFieldsModelType } from "./OrganizationsMinFieldsModel"
import { OrganizationsMinFieldsModelSelector } from "./OrganizationsMinFieldsModel.base"
import { RootStoreType } from "./index"


/**
 * OrganizationsAggregateFieldsBase
 * auto generated base class for the model OrganizationsAggregateFieldsModel.
 *
 * aggregate fields of "organizations"
 */
export const OrganizationsAggregateFieldsModelBase = ModelBase
  .named('OrganizationsAggregateFields')
  .props({
    __typename: types.optional(types.literal("organizations_aggregate_fields"), "organizations_aggregate_fields"),
    count: types.union(types.undefined, types.integer),
    max: types.union(types.undefined, types.null, types.late((): any => OrganizationsMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late((): any => OrganizationsMinFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class OrganizationsAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  max(builder?: string | OrganizationsMaxFieldsModelSelector | ((selector: OrganizationsMaxFieldsModelSelector) => OrganizationsMaxFieldsModelSelector)) { return this.__child(`max`, OrganizationsMaxFieldsModelSelector, builder) }
  min(builder?: string | OrganizationsMinFieldsModelSelector | ((selector: OrganizationsMinFieldsModelSelector) => OrganizationsMinFieldsModelSelector)) { return this.__child(`min`, OrganizationsMinFieldsModelSelector, builder) }
}
export function selectFromOrganizationsAggregateFields() {
  return new OrganizationsAggregateFieldsModelSelector()
}

export const organizationsAggregateFieldsModelPrimitives = selectFromOrganizationsAggregateFields().count

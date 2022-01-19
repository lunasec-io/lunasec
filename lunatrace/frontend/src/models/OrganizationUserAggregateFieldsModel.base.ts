/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { OrganizationUserMaxFieldsModel, OrganizationUserMaxFieldsModelType } from "./OrganizationUserMaxFieldsModel"
import { OrganizationUserMaxFieldsModelSelector } from "./OrganizationUserMaxFieldsModel.base"
import { OrganizationUserMinFieldsModel, OrganizationUserMinFieldsModelType } from "./OrganizationUserMinFieldsModel"
import { OrganizationUserMinFieldsModelSelector } from "./OrganizationUserMinFieldsModel.base"
import { RootStoreType } from "./index"


/**
 * OrganizationUserAggregateFieldsBase
 * auto generated base class for the model OrganizationUserAggregateFieldsModel.
 *
 * aggregate fields of "organization_user"
 */
export const OrganizationUserAggregateFieldsModelBase = ModelBase
  .named('OrganizationUserAggregateFields')
  .props({
    __typename: types.optional(types.literal("organization_user_aggregate_fields"), "organization_user_aggregate_fields"),
    count: types.union(types.undefined, types.integer),
    max: types.union(types.undefined, types.null, types.late((): any => OrganizationUserMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late((): any => OrganizationUserMinFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class OrganizationUserAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  max(builder?: string | OrganizationUserMaxFieldsModelSelector | ((selector: OrganizationUserMaxFieldsModelSelector) => OrganizationUserMaxFieldsModelSelector)) { return this.__child(`max`, OrganizationUserMaxFieldsModelSelector, builder) }
  min(builder?: string | OrganizationUserMinFieldsModelSelector | ((selector: OrganizationUserMinFieldsModelSelector) => OrganizationUserMinFieldsModelSelector)) { return this.__child(`min`, OrganizationUserMinFieldsModelSelector, builder) }
}
export function selectFromOrganizationUserAggregateFields() {
  return new OrganizationUserAggregateFieldsModelSelector()
}

export const organizationUserAggregateFieldsModelPrimitives = selectFromOrganizationUserAggregateFields().count

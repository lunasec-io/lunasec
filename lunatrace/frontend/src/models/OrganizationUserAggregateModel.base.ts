/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { OrganizationUserAggregateFieldsModel, OrganizationUserAggregateFieldsModelType } from "./OrganizationUserAggregateFieldsModel"
import { OrganizationUserAggregateFieldsModelSelector } from "./OrganizationUserAggregateFieldsModel.base"
import { OrganizationUserModel, OrganizationUserModelType } from "./OrganizationUserModel"
import { OrganizationUserModelSelector } from "./OrganizationUserModel.base"
import { RootStoreType } from "./index"


/**
 * OrganizationUserAggregateBase
 * auto generated base class for the model OrganizationUserAggregateModel.
 *
 * aggregated selection of "organization_user"
 */
export const OrganizationUserAggregateModelBase = ModelBase
  .named('OrganizationUserAggregate')
  .props({
    __typename: types.optional(types.literal("organization_user_aggregate"), "organization_user_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late((): any => OrganizationUserAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late((): any => OrganizationUserModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class OrganizationUserAggregateModelSelector extends QueryBuilder {
  aggregate(builder?: string | OrganizationUserAggregateFieldsModelSelector | ((selector: OrganizationUserAggregateFieldsModelSelector) => OrganizationUserAggregateFieldsModelSelector)) { return this.__child(`aggregate`, OrganizationUserAggregateFieldsModelSelector, builder) }
  nodes(builder?: string | OrganizationUserModelSelector | ((selector: OrganizationUserModelSelector) => OrganizationUserModelSelector)) { return this.__child(`nodes`, OrganizationUserModelSelector, builder) }
}
export function selectFromOrganizationUserAggregate() {
  return new OrganizationUserAggregateModelSelector()
}

export const organizationUserAggregateModelPrimitives = selectFromOrganizationUserAggregate()

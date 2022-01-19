/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { OrganizationsAggregateFieldsModel, OrganizationsAggregateFieldsModelType } from "./OrganizationsAggregateFieldsModel"
import { OrganizationsAggregateFieldsModelSelector } from "./OrganizationsAggregateFieldsModel.base"
import { OrganizationsModel, OrganizationsModelType } from "./OrganizationsModel"
import { OrganizationsModelSelector } from "./OrganizationsModel.base"
import { RootStoreType } from "./index"


/**
 * OrganizationsAggregateBase
 * auto generated base class for the model OrganizationsAggregateModel.
 *
 * aggregated selection of "organizations"
 */
export const OrganizationsAggregateModelBase = ModelBase
  .named('OrganizationsAggregate')
  .props({
    __typename: types.optional(types.literal("organizations_aggregate"), "organizations_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late((): any => OrganizationsAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late((): any => OrganizationsModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class OrganizationsAggregateModelSelector extends QueryBuilder {
  aggregate(builder?: string | OrganizationsAggregateFieldsModelSelector | ((selector: OrganizationsAggregateFieldsModelSelector) => OrganizationsAggregateFieldsModelSelector)) { return this.__child(`aggregate`, OrganizationsAggregateFieldsModelSelector, builder) }
  nodes(builder?: string | OrganizationsModelSelector | ((selector: OrganizationsModelSelector) => OrganizationsModelSelector)) { return this.__child(`nodes`, OrganizationsModelSelector, builder) }
}
export function selectFromOrganizationsAggregate() {
  return new OrganizationsAggregateModelSelector()
}

export const organizationsAggregateModelPrimitives = selectFromOrganizationsAggregate()

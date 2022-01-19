/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PackageVersionsAggregateFieldsModel, PackageVersionsAggregateFieldsModelType } from "./PackageVersionsAggregateFieldsModel"
import { PackageVersionsAggregateFieldsModelSelector } from "./PackageVersionsAggregateFieldsModel.base"
import { PackageVersionsModel, PackageVersionsModelType } from "./PackageVersionsModel"
import { PackageVersionsModelSelector } from "./PackageVersionsModel.base"
import { RootStoreType } from "./index"


/**
 * PackageVersionsAggregateBase
 * auto generated base class for the model PackageVersionsAggregateModel.
 *
 * aggregated selection of "package_versions"
 */
export const PackageVersionsAggregateModelBase = ModelBase
  .named('PackageVersionsAggregate')
  .props({
    __typename: types.optional(types.literal("package_versions_aggregate"), "package_versions_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late((): any => PackageVersionsAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late((): any => PackageVersionsModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class PackageVersionsAggregateModelSelector extends QueryBuilder {
  aggregate(builder?: string | PackageVersionsAggregateFieldsModelSelector | ((selector: PackageVersionsAggregateFieldsModelSelector) => PackageVersionsAggregateFieldsModelSelector)) { return this.__child(`aggregate`, PackageVersionsAggregateFieldsModelSelector, builder) }
  nodes(builder?: string | PackageVersionsModelSelector | ((selector: PackageVersionsModelSelector) => PackageVersionsModelSelector)) { return this.__child(`nodes`, PackageVersionsModelSelector, builder) }
}
export function selectFromPackageVersionsAggregate() {
  return new PackageVersionsAggregateModelSelector()
}

export const packageVersionsAggregateModelPrimitives = selectFromPackageVersionsAggregate()

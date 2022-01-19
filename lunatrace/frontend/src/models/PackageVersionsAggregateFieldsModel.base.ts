/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PackageVersionsMaxFieldsModel, PackageVersionsMaxFieldsModelType } from "./PackageVersionsMaxFieldsModel"
import { PackageVersionsMaxFieldsModelSelector } from "./PackageVersionsMaxFieldsModel.base"
import { PackageVersionsMinFieldsModel, PackageVersionsMinFieldsModelType } from "./PackageVersionsMinFieldsModel"
import { PackageVersionsMinFieldsModelSelector } from "./PackageVersionsMinFieldsModel.base"
import { RootStoreType } from "./index"


/**
 * PackageVersionsAggregateFieldsBase
 * auto generated base class for the model PackageVersionsAggregateFieldsModel.
 *
 * aggregate fields of "package_versions"
 */
export const PackageVersionsAggregateFieldsModelBase = ModelBase
  .named('PackageVersionsAggregateFields')
  .props({
    __typename: types.optional(types.literal("package_versions_aggregate_fields"), "package_versions_aggregate_fields"),
    count: types.union(types.undefined, types.integer),
    max: types.union(types.undefined, types.null, types.late((): any => PackageVersionsMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late((): any => PackageVersionsMinFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class PackageVersionsAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  max(builder?: string | PackageVersionsMaxFieldsModelSelector | ((selector: PackageVersionsMaxFieldsModelSelector) => PackageVersionsMaxFieldsModelSelector)) { return this.__child(`max`, PackageVersionsMaxFieldsModelSelector, builder) }
  min(builder?: string | PackageVersionsMinFieldsModelSelector | ((selector: PackageVersionsMinFieldsModelSelector) => PackageVersionsMinFieldsModelSelector)) { return this.__child(`min`, PackageVersionsMinFieldsModelSelector, builder) }
}
export function selectFromPackageVersionsAggregateFields() {
  return new PackageVersionsAggregateFieldsModelSelector()
}

export const packageVersionsAggregateFieldsModelPrimitives = selectFromPackageVersionsAggregateFields().count

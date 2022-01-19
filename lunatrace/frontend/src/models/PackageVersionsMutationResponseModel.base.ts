/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PackageVersionsModel, PackageVersionsModelType } from "./PackageVersionsModel"
import { PackageVersionsModelSelector } from "./PackageVersionsModel.base"
import { RootStoreType } from "./index"


/**
 * PackageVersionsMutationResponseBase
 * auto generated base class for the model PackageVersionsMutationResponseModel.
 *
 * response of any mutation on the table "package_versions"
 */
export const PackageVersionsMutationResponseModelBase = ModelBase
  .named('PackageVersionsMutationResponse')
  .props({
    __typename: types.optional(types.literal("package_versions_mutation_response"), "package_versions_mutation_response"),
    /** number of rows affected by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data from the rows affected by the mutation */
    returning: types.union(types.undefined, types.array(types.late((): any => PackageVersionsModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class PackageVersionsMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder?: string | PackageVersionsModelSelector | ((selector: PackageVersionsModelSelector) => PackageVersionsModelSelector)) { return this.__child(`returning`, PackageVersionsModelSelector, builder) }
}
export function selectFromPackageVersionsMutationResponse() {
  return new PackageVersionsMutationResponseModelSelector()
}

export const packageVersionsMutationResponseModelPrimitives = selectFromPackageVersionsMutationResponse().affected_rows

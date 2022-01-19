/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * PackageVersionsMaxFieldsBase
 * auto generated base class for the model PackageVersionsMaxFieldsModel.
 *
 * aggregate max on columns
 */
export const PackageVersionsMaxFieldsModelBase = ModelBase
  .named('PackageVersionsMaxFields')
  .props({
    __typename: types.optional(types.literal("package_versions_max_fields"), "package_versions_max_fields"),
    fix_state: types.union(types.undefined, types.null, types.string),
    id: types.union(types.undefined, types.null, types.frozen()),
    pkg_slug: types.union(types.undefined, types.null, types.string),
    slug: types.union(types.undefined, types.null, types.string),
    version_constraint: types.union(types.undefined, types.null, types.string),
    version_format: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class PackageVersionsMaxFieldsModelSelector extends QueryBuilder {
  get fix_state() { return this.__attr(`fix_state`) }
  get id() { return this.__attr(`id`) }
  get pkg_slug() { return this.__attr(`pkg_slug`) }
  get slug() { return this.__attr(`slug`) }
  get version_constraint() { return this.__attr(`version_constraint`) }
  get version_format() { return this.__attr(`version_format`) }
}
export function selectFromPackageVersionsMaxFields() {
  return new PackageVersionsMaxFieldsModelSelector()
}

export const packageVersionsMaxFieldsModelPrimitives = selectFromPackageVersionsMaxFields().fix_state.pkg_slug.slug.version_constraint.version_format
